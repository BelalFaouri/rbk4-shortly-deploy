var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
     username:{type:String,index:{unique:true}},
     password:String
});

var User=mongoose.model('User',userSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      if(err){
        callbak(err)
      }else{
      callback(null,isMatch);        
      }
    });
  }


userSchema.pre('save',function(next){
  //this.on('creating', this.hashPassword);
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.password, null, null).bind(this)
      .then(function(hash) {
        this.password= hash;
        next()
      });
})


module.exports = User;
