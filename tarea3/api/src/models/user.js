const { Schema, model} = require('mongoose');


const schema = new Schema({
    name: { type: String },
    email: { type: String },
    password: {type: String },
    status: { type: String, default: 'new' },
    role: {type: String, default: 'student'}
});

module.exports = model('User', schema);