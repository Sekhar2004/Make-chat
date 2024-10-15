import express from 'express'
import {registerUser, loginUser, allUser, findUser, uploadPic} from '../controllers/user.controllers.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/all', verifyToken, allUser)
router.get('/', verifyToken, findUser)
router.post('/uploadPic', verifyToken, uploadPic)


export default router