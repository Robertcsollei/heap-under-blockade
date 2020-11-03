var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema=new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: {type: String, required: true}
   
});

module.exports=mongoose.model('Category', CategorySchema);