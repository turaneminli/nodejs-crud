const Post = require("../models/post");
const crud = require("../utils/crud");

exports.addUserId = (req, res, next) => {
  if (!req.body.author) req.body.author = req.userId;
  next();
};

exports.createPost = crud.createOne(Post);
exports.getPost = crud.getOne(Post);
exports.updatePost = crud.updateOne(Post);
exports.deletePost = crud.deleteOne(Post);
exports.getAllPosts = crud.getAll(Post);
