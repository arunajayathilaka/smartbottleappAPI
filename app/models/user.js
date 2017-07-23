var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
var UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    weight:{
        type:Number,
        required:true
    },
    excise_time:{
        type:Number,
        required:true
    },
    img_url:{
        type: String,
        default:'http://nawaejhelum.com/files/images/web/noauthorphoto.png'
    },
    updated:{
        type:Date,
        default:Date.now
    }
});
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                console.log('all hash done');
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        //give it to callback function of cb(in server.js)
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);