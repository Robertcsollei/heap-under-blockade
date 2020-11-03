require('dotenv').config() 
const mongoose = require("mongoose")
const commentModel = require("../models/comments")
const userModel = require("../models/users")
const questionModel = require("../models/question")



exports.comment_post_new = (req, res) => {
    let questionId = req.params.question_id

    //first check if the user exists who have posted the comment, if it does, contimues to find and return the comment
    userModel.findById(req.body.user_id)
    .then(user => {
        if(!user){
            return res.status(404).json({
                error: "User not found, you must log in to be able to comment"
            })
        }
    })

    let comment = new commentModel({
        _id: new mongoose.Types.ObjectId(),
        Title: req.body.title,
        Body: req.body.body,
        PostDate:  Date.now(),
        UserId: req.body.user_id,
        EventImage:req.body.images,
        Votes: 0
    })

    comment.save()
    //also pushes the comment id to the question on which it exists
    questionModel.findById(questionId)
    .exec()
    .then(qst => {
       
            const comments = qst.Comments
            comments.push(comment)
            const updatedOps = {}
            updatedOps["Comments"] = comments
            //console.log(updatedOps)
            let newQst = {
                _id: qst._id,
                Title: qst.Title,
                Body: qst.Body,
                Tags: qst.Tags,
                PostDate:  qst.PostDate,
                EditDate: qst.EditDate,
                cmtegoryid: qst.cmtegoryid,
                UserId: qst.UserId,
                isBlocked: qst.isBlocked,
                EventImage: qst.EventImage,
                Comments: comments,
                Votes: qst.Votes
            }
           // console.log(newQst)
            
           questionModel.updateOne({_id: questionId}, {$set: updatedOps})
           .exec()
           .then(result => {
              // console.log(result);
               res.status(200).json({
                   success: result,
                   newQst: newQst
               
               });
           })
           .cmtch(err => {
               console.log(err);
               res.status(500).json({
               error: err
               });
           });
        
        
    })
    
}


//get all comments by a specific user
exports.comment_get_all_byUser = (req,res) =>{
    let userComments = []
    questionModel.find()
    .then(qst => {
        for(let cmt in qst.Comments){
            if(cmt.UserId === req.body.user_id){
                userComments.push(cmt)
            }
            res.status(200).json(userComments)
        }
    }).catch(err => {
        res.status(500).json(err)    
    })
}

exports.comment_get_byid = (req, res) => {
commentModel.findById(req.params.comment_id)
.then(cmt => {
  if(!cmt){
      return res.status(404).json({
          error: "comment does not exists"
      })
  }
  return res.status(200).json(cmt) 
})
}

exports.comment_patch = (req, res) => {
  const id = req.params.comment_id;
  commentModel.updateOne({ _id: id }, { $set: req.body }).then(result => {
      res.status(201).json(result)
  }).catch(err => {
      res.status(500).json(err)
  })
}

//Update the Vote state on the Comment object - being called on every vote change
exports.comment_modify_voted = (req, res) => {
    const id = req.params.comment_id;
    let value = 0
    if(req.body.add === true){
        value = 1
    }else{
        value =  -1
    }

    commentModel.findById({_id: id})
    .exec()
    .then(cmt => {
        cmt.Votes += value
        console.log(cmt.Votes)
        cmt.save()
        .then(result => {
            res.status(201).json({success: result})
        }).catch(err => {
            res.status(500).json({error: err})
        })
    })

}


exports.comment_delete = (req, res) => {
  let id = req.params.comment_id
  commentModel.deleteOne({_id: id})
  .exec()
  .then(result => {
      res.status(200).json({
          deletedElemenetd: result
      })
  })
}
