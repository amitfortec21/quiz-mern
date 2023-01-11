import mongoose from "mongoose";
const { Schema } = mongoose;

// user model
const userModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    is_admin: {
        type: Number,
        default: 0
    },
    is_verified: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        default: ""
    },
}, {timestamps: true});

export default mongoose.model("user", userModel);