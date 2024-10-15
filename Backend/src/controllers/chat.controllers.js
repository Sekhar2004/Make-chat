import ChatModel from '../models/chat.model.js'
import UserModel from '../models/user.model.js'

// returns chat b/w userId and curr user
// if not found creates a new Chat
const accessChat = async (req, res) => {
    const {userId} = req.body
    
    if(!userId){
        console.log('friendId not found')
        return res.sendStatus(400)
    }

    var isChat = await ChatModel.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}}
        ]
    }).populate('users', '-password').populate('latestMessage')

    // populating sender field of the latestMessage

    isChat = await UserModel.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    })

    if(isChat.length > 0){
        res.send(isChat[0])
    }else{
        // create chat
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            const createdChat = await ChatModel.create(chatData)
            const chat = await ChatModel.findOne({_id: createdChat._id}).populate("users", "-password")
            res.status(201).send(chat)
        } catch (error) {
            console.error('Error during accessing chat:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

const fetchChat = async (req, res) => {
    try {
        ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            results = await UserModel.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
            });
            res.status(200).send(results);
        });      
    } catch (error) {
        console.error('Error during accessing chat:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// takes name of group and list of users
const createChatGroup = async (req, res) => {
    if(!req.body.users || !req.body.groupName){
        return res.status(400).send({message: "Please fill all fields!"})
    }

    var users = JSON.parse(req.body.users)
    if(users.length < 2){
        return res.status(400).send("more than 2 users are required to form a group")
    }
    users.push(req.user)

    try {
        const groupChat = await ChatModel.create({
            chatName: req.body.groupName,
            users,
            isGroupChat: true,
            groupAdmin: req.user
        })

        const chat = await ChatModel.findOne({_id: groupChat._id})
        .populate('users', '-password')
        .populate('groupAdmin', '-password')

        res.status(201).json(chat)
    } catch (error) {
        console.error('Error during accessing chat:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const renameChatGroup = async (req, res) => {
    try {
        const {chatId, newGroupName} = req.body
        const chat = await ChatModel.findByIdAndUpdate(chatId, {chatName: newGroupName}, {new: true})
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        
        if(!chat){
            return res.status(400).send('chat not found')
        }else{
            res.json(chat)
        }
    } catch (error) {
        console.error('Error during renameing chat:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const addToGroup = async (req, res) => {
    try {
        const {chatId, userId} = req.body
        const chat = await ChatModel.findByIdAndUpdate(chatId, {$push: {users: userId}},{new: true})
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        
        if(!chat){
            return res.status(404).send('chat not found')
        }else{
            res.json(chat)
        }

    } catch (error) {
        console.error('Error during adding to chat:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const removeFromGroup = async (req, res) => {
    try {
        const {chatId, userId} = req.body
        const chat = await ChatModel.findByIdAndUpdate(chatId, {$pull: {users: userId}}, {new: true})
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        
        if(!chat){
            return res.status(404).send('chat not found')
        }else{
            res.json(chat)
        }

    } catch (error) {
        console.error('Error during adding to chat:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export {accessChat, fetchChat, createChatGroup, renameChatGroup, addToGroup, removeFromGroup}