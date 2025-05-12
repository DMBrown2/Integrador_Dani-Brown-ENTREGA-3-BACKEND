const mongooe = require('mongoose');
const Schema = mongooe.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlenght: 3,
        maxlenght: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        minlenght: 5,
        maxlenght: 108,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            },
            message: props => `${props.value} no es un correo electrónico válido!`
        }
    },
    password: {
        type: String,
        required: true,
        minlenght: 4,
        maxlenght: 100,
        trim: true
    },
    country: {
        type: String,
        required: true,
        minlenght: 3,
        maxlenght: 50
        // enum: ["Mexico", "USA", "Canada", "Colombia", "Argentina", "Peru", "Chile", "Spain", "Italia"],
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator', 'editor'],
        default: 'user'
    },
    message: {
        type: String,
        required: true,
        minlenght: 3,
        maxlenght: 50
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    // deletedAt: {
    //     type: Date,
    //     default: null
    // },
    // scopes: {
    //     type: [String],
    //     enum: ['read', 'write', 'delete'],
    //     default: ['read']
    // },
}, {
    timestamps: true
})

module.exports = mongooe.model("User", userSchema)