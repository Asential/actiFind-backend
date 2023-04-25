import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    host: String,
    tags: [String],
    image: String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage;