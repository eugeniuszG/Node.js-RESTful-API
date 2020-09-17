const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var leaderSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        required: true        
    },
    designation: {
        type: String,
        unique: true
    },
    abbr: {
        type: String,
        unique: true 
    },
    description: {
        type: String,
        unique: true
    },
    featured: {
        type: Boolean,
        required: false
    },
},
    {timestamps: true
});

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;