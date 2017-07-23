var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
var DataSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    ph_value: {
        type: String,
        required: true
    },
    fluid_consume:{
        type:String,
        required:true
    },
    previous_consume:{
        type:Array,
        required:true
    },
    updated:{
        type:Date,
        default:Date.now
    }
});
 

 
module.exports = mongoose.model('Data', DataSchema);