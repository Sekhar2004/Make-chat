import mongoose from 'mongoose'

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log('DB connected')
    } catch (error) {
        console.log(error.message)
    }
}

export default connect