const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please input your full name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide your phone number'],
        minlength: [11, 'Phone number must be at least 11 digits']
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    }
}, {timestamps: true});


// virtual field for password confirmation
userSchema.virtual('passwordConfirm').get(function() {
    return this._passwordConfirm;
});

// validate password confirmation
userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    if (this.password !== this.passwordConfirm) {
        return next(new Error("Passwords are not the same!"));
    }

    next();
});

// hash the password before saving it to the database
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model("User", userSchema);

module.exports = User;