const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        trim:true,
        minLength:1,
        maxLength:20,
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        index: true,
        lowercase: true,
        unique: true,
        minLength: 5,
        maxLength: 50,
    },
    password: String,

},
{ timestamps: true }
)

userSchema.plugin(uniqueValidator)

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

const User = mongoose.model('UserModel', userSchema);

module.exports = User;
