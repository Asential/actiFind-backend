import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find();
        
        res.status(200).json(postMessages);

    } catch (error){
        res.status(404).json({ message: error.message });
    }    
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, host: req.userId, createdAt: new Date().toISOString()});
    console.log("creating new post")
    try{
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error){
        res.status(409).json({ message: error.message });

    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Post does not exist!');
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });

    res.json(updatedPost);
} 

export const deletePost = async (req, res) => {
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Post does not exist!');
    await PostMessage.findByIdAndRemove(_id);
    res.json({message: "Post Deleted Successfully!"});
}

export const likePost = async (req, res) => {
    
    if(!req.userId) return res.json({messaage: "Unauthenticated user!"});
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Post does not exist!');
    
    // Find the post and increment the like count
    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});

    res.json(updatedPost);
}

export const getPostsBySearch = async (req, res) => {
    
    // req.query is for query parameters and req.params is for search parameters
    const { searchQuery, tags } = req.query;

    try {
        console.log(searchQuery);
        const title = new RegExp(searchQuery, "i"); // 'i' stands for ignore case

        // $or for either tags or title search.
        // const posts = await PostMessage.find({$or: [ {title}, {tags: { $in: tags.split(',') }}]});
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
        console.log(posts);
        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}