import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'normal',
        enum: ['normal', 'admin'],
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", UserSchema);

export default User;