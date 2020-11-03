var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema=new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Title: {type: String, required: true},
    Body: {type: String, required: true},
    Tags: [{type: String, required: false}],
    PostDate: {type: Date, default: Date.now},
    EditDate: {type: Date, default: null},
    Categoryid: {type: mongoose.Schema.Types.ObjectId, ref: 'Category' ,required: true},
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    isBlocked: {type: Boolean, default: false},
    EventImage: [{type: String, required: false}],
    Comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: false}],
    Votes: {type: Number, default: 0}
});

module.exports=mongoose.model('Questions', QuestionSchema);