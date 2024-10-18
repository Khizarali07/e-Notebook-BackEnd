const mongoose = require('mongoose');
const {Schema} = mongoose;

const Notes = new Schema({
    email :{
        type:String,
    },
    imageUrl : {
        type:String,
    },
    title : {
        type:String,
        required:true
    },
    desc : {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Notebook = mongoose.model('Notes', Notes);
module.exports = Notebook;