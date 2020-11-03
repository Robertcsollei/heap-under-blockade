require('dotenv').config() 
const mongoose = require("mongoose")
const questionModel = require("../models/question")
const categoryModel = require("../models/categories")
const userModel = require("../models/users")



exports.questions_get_all = (req,res) =>{
    questionModel.find()
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch((err) => {
        res.status(500).json(err)
    })
}

exports.question_get_byid = (req, res) => {
    questionModel.findById(req.params.question_id)
    .then(qst => {
        if(!qst){
            return res.status(404).json({
                error: "Question under this ID does not exists"
            })
        }
        return res.status(200).json(qst) 
    })
} 

exports.question_get_byCat = (req, res) => {
questionModel.find({Categoryid: req.params.category_id})
.exec()
.then(qst => {
    if(!qst){
        return res.status(404).json({
            error: "Question under this ID does not exists"
        })
    }
    return res.status(200).json(qst) 

})
}


exports.question_patch = (req, res, next) => {
    const id = req.params.question_id;

    questionModel.updateOne({ _id: id }, { $set: req.body }).then(result => {
        res.status(201).json({success: result})
    }).catch(err => {
        res.status(500).json({error: err})
    })
}

exports.question_modify_votes = (req, res) => {
    const id = req.params.question_id;
    let value = 0
    if(req.body.add === true){
        value = 1
    }else{
        value =  -1
    }

    questionModel.findById({_id: id})
    .exec()
    .then(qst => {
        qst.Votes += value
        console.log(req.body.add)
        qst.save()
        .then(result => {
            res.status(201).json({success: result})
        }).catch(err => {
            res.status(500).json({error: err})
        })
    })
}

exports.question_post_new = (req, res) => {

    categoryModel.findById(req.body.category_id)
    .then(doc => {
        if(!doc){
            return res.status(404).json({
                error: "Category not found"
            })
        }
    })
    userModel.findById(req.body.user_id)
    .then(user => {
        if(!user){
            return res.status(404).json({
                error: "User is not found!"
            })
        }
    })
   var newQuestion = new questionModel({
    _id: new mongoose.Types.ObjectId,
    Title: req.body.title,
    Body: req.body.body,
    Tags: req.body.tags,
    PostDate:  Date.now(),
    EditDate: null,
    Categoryid: req.body.category_id,
    UserId: req.body.user_id,
    isBlocked: false,
    EventImage: req.body.images,
    Comments: [],
    Votes: 0
   })

   return newQuestion
   .save()
   .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Handling POST requests to /question",
      createdProduct: result
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.question_delete = (req, res) => {
    let id = req.params.category_id
    questionModel.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            deletedElemenetd: result
        })
    })
}