import express from 'express'
import {accessChat, fetchChat, createChatGroup, renameChatGroup, addToGroup, removeFromGroup} from '../controllers/chat.controllers.js'

const router = express.Router()

router.post('/', accessChat)
router.get('/', fetchChat)
router.post('/createGroup', createChatGroup)
router.put('/renameGroup', renameChatGroup)
router.put('/addToGroup', addToGroup)
router.put('/removeFromGroup', removeFromGroup)


export default router