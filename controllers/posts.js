const Post = require("../models/post");
const User = require("../models/user")


// Class definition for the PostController
class PostController {
    // Method for creating a new post
    static async CreatePost(req, res, next) {
        console.log("post post hit")
        try {
            // Destructuring title and description from the request body
            const { title, description } = req.body;
            console.log("title", title, "des", description)

            // Checking if title or description is missing
            if (!title || !description) return res.status(400).json("Please provide title and description");

            // Creating a new post with the provided title, user ID, and description
            const post = await Post.create({
                title,
                userId: req.user._id,
                description,
            });

            // Sending a success response with the created post
            res.status(200).json(post);
        } catch (error) {
            // Logging the error and passing it to the error handling middleware
            console.log(error);
            next(error);
        }
    }

    // Method for deleting a post by its ID
    static async DeletePostById(req, res, next) {
        try {
            // Extracting the post ID from the request parameters
            const postId = req.params.id;

            // Implement deletion logic here

            Post.deleteOne({_id: req.params.id})
                
            // Sending a success response after successful deletion
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            // Logging the error and passing it to the error handling middleware
            console.log(error);
            next(error);
        }
    }

    // Method for updating a post by its ID
    static async UpdatePost(req, res, next) {
        console.log("asdfdas", req.body)
        try {
            // Extracting the post ID from the request parameters
            const postId = req.params.id;

            // Implement update logic here
            Post.findOneAndUpdate({ _id: postId }, req.body, { new: true })

                .then(found => {
                    console.log("found UPDATE", found)
                })

            // Sending a success response after successful update
            res.status(200).json({ message: 'Post updated successfully' });
        } catch (error) {
            // Logging the error and passing it to the error handling middleware
            console.log(error);
            next(error);
        }
    }

    // Method for getting a post by its ID
    static async GetPostById(req, res, next) {
        console.log("get post by id")
        try {
            // Extracting the post ID from the request parameters
            const postId = req.params.id;

            // Implement retrieval logic here

            Post.findById(postId)
            // .populate(User)
                .then(found => {
                    console.log("found")
                    res.status(200).json({ 
                        message: 'Retrieved post by ID', 
                        found });
                })


            // Sending a success response with the retrieved post
        } catch (error) {
            // Logging the error and passing it to the error handling middleware
            console.log(error);
            next(error);
        }
    }

    // Method for getting posts by a user's ID
    static async GetPostByUserId(req, res, next) {
        try {
            // Extracting the user ID from the request parameters
            const userId = req.params.userId;

            // Implement retrieval logic here

            User.findById(userId)

            // .populate(User)

                .then(found => {
                    console.log("found")
                    res.status(200).json({ 
                        message: 'Retrieved post by ID', 
                        found });
                })
            // Sending a success response with the retrieved posts
            res.status(200).json({ message: 'Retrieved posts by user ID' });
        } catch (error) {
            // Logging the error and passing it to the error handling middleware
            console.log(error);
            next(error);
        }
    }
}

// Exporting the PostController class to be used by other modules
module.exports = PostController;