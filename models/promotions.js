const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

var promoSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        required: true        
    },
    label: {
        type: String,
        unique: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
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

var Promos = mongoose.model('Promo', promoSchema);

module.exports = Promos;