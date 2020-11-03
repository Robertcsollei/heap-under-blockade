require('dotenv').config() 
const mongoose = require("mongoose")
const categoryModel = require("../models/categories")



exports.category_post_new = (req, res) => {
    console.log(req.body)
    let category = new categoryModel({
        _id: new mongoose.Types.ObjectId(),
        Name: req.body.name,
    })
    
    return category.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Handling POST requests to /products",
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



exports.category_get_all = (req,res) =>{
  categoryModel.find()
  .exec()
  .then(doc =>{
      
      res.status(200).json(doc);
  })
  .catch((err) => {
      res.status(500).json(err)
  })
}

exports.category_get_byid = (req, res) => {
categoryModel.findById(req.params.category_id)
.then(cat => {
  if(!cat){
      return res.status(404).json({
          error: "Category does not exists"
      })
  }else{
    return  res.status(200).json(cat) 
  }
 
})
}

exports.category_patch = (req, res) => {
  const id = req.params.category_id;
  console.log("The id: " + id, req.body)
  categoryModel.updateOne({ _id: id }, { $set: req.body }).then(
    result => {
      res.status(201).json(result)
    }
  ).catch(err => {
    console.log(err)
  })
}

exports.category_delete = (req, res) => {
  let id = req.params.category_id
  questionModel.deleteOne({_id: id})
  .exec()
  .then(result => {
      res.status(200).json({
          deletedElemenetd: result
      })
  })
}
