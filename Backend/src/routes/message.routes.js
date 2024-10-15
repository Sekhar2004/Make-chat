import express from 'express'
import {sendMessage, fetchMessages} from '../controllers/message.controllers.js'

const router = express.Router()

router.post('/', sendMessage)
router.get('/:chatId', fetchMessages)


export default router