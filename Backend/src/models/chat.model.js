import mongoose, { modelNames } from 'mongoose'

const ChatSchema = new mongoose.Schema({
    chatName: {type: String, trim: true},
    isGroupChat: {type: Boolean, default: false},
    users: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }],
    latestMessage: {
        type: mongoose.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
},
{
    timestamps: true
})

const ChatModel = mongoose.model('Chat', ChatSchema)
export default ChatModel