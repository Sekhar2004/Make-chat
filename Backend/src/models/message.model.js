import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: {type: mongoose.Types.ObjectId, ref: "User"},
    content: {type: String, trim: true},
    chat: {type: mongoose.Types.ObjectId, ref: "Chat"}
},
{
    timestamps: true
})

const MessageModel = mongoose.model('Message', MessageSchema)
export default MessageModel