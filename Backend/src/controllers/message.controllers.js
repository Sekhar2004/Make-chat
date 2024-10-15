import MessageModel from '../models/message.model.js'
import ChatModel from '../models/chat.model.js'
import UserModel from '../models/user.model.js'

const sendMessage = async (req, res) => {
    const {content, chatId} = req.body

    if(!content || !chatId){
        console.log('missing fields!')
        return res.sendStatus(400)
    }

    var newMessageDetails = {
        sender: req.user,
        content,
        chat: chatId
    }

    try {
        var message = await MessageModel.create(newMessageDetails)
        message = await message.populate('sender', 'name pic');
        message = await message.populate('chat');
        message = await UserModel.populate(message, {
            path: 'chat.users',
            select: 'name pic email'
        })

        await ChatModel.findByIdAndUpdate(chatId, {latestMessage: message})

        res.json(message)

    } catch (error) {
        console.error('Error during sending message:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const fetchMessages = async (req, res) => {
    const {chatId} = req.params
    try {
        const messages = await MessageModel.find({chat: chatId})
        .populate('sender', 'name pic email')
        .populate('chat')

        res.json(messages)
    } catch (error) {
        console.error('Error during fetching message:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export {sendMessage, fetchMessages}