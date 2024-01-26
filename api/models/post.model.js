import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type : 'string',
        required : true
    },
    content: {
        type : 'string',
        required : true
    },
    title:{
        type :'string',
        required : true,
        unique : true
    },
    image:{
        type :'string',
        default:'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    category: {
        type: 'string',
        default: 'Uncategorized'
    },
    slug:{
        type :'string',
        required : true,
        unique : true
    }

},{timestamps : true });

const Post = mongoose.model("Post", postSchema);


export default Post;