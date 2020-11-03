var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema=new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    UserName: {type: String, required: true},
    Password: {type:String, required: true},
    Email: {type:String, required: true},
    Description: {type: String, required: true},
    RegistrationDate: {type: Date, required: true},
    UserRole: {type: mongoose.Schema.Types.ObjectId, ref: 'Roles' ,required: true},
    isBlocked: {type: Boolean, required: true},
    ProfileImage: {type: String, required: false}
});

module.exports=mongoose.model('Users', UserSchema);