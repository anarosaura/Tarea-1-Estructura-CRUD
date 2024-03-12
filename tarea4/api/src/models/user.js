const { Schema, model} = require('mongoose');

const schema = new Schema({
    name: { type: String },
    username: { type: String },
    email: { type: String },
    password: {type: String },
    status: { type: String, default: 'new' },
    role: {type: String, default: 'user'}
});

module.exports = model('User', schema);