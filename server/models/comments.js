var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema=new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Title: {type: String, required: true},
    Body: {type: String, required: true},
    PostDate: {type: Date, default: Date.now},
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    EventImage: [{type: String, required: false}],
    Votes: {type: Number, default: 0}
});

module.exports=mongoose.model('Comment', CommentSchema);