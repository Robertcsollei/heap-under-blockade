var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserRoleSchema=new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    RoleName: {type: String, required: true},
    DeleteComments: {type: Boolean, default: false},
    
});

module.exports=mongoose.model('Roles', UserRoleSchema);