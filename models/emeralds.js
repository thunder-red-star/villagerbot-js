const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
let Long =  mongoose.Schema.Types.Long,
emeraldsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: Long,
    emeralds: Number,
    lastclaim: Long, 
    streak: Number,
    vault: Number, 
    capacity: Number
});
module.exports = mongoose.model("Emeralds",emeraldsSchema)
