var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fName: String,
    lName: String,
    title: String,
    sex: String,
    age: Number
});
//firebase local storage
module.exports = mongoose.model('User', UserSchema);