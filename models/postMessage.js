import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    name: String,
    title: String,
    description: String,
    host: String,
    tags: [String],
    image: String,
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: {
        type: [String],
        default: []
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage;