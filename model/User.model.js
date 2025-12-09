import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { // object kyo banaya taki or fields add kar sake
        type: String,
        enum: ["user", "admin"], // role me sirf ye do value aa sakti hai
        default: "user" // default value user hai
    },
    isVerified: {
        type: Boolean,
        default: false // default value false hai taki pehle verify na ho
    },
    verificationToken: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },  
    resetPasswordExpires: {
        type: Date
    }   
}) // schema me aao and ek object banao and bhar do fields


const User = mongoose.model("User", userSchema);

export default User;