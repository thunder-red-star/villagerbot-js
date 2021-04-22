const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
let Long =  mongoose.Schema.Types.Long,
settingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: Long,
    prefix: String,
    difficulty: Number,
    ignore: String
});
module.exports = mongoose.model("Setting",settingSchema)
