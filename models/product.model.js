const mongoose = require('mongoose');
const { create } = require('./user.model');
const Schema  = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    category: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Category',
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);