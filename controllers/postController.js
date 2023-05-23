const mongoose = require("mongoose");
const Post = require("../model/postModel");
const Types = require("mongoose").Types;

exports.createPost = async (req, res, next) => {
  try {
    const { title, body, userId, category, photo } = req.body;
    const post = await Post.create({
      title,
      body,
      userId,
      category,
      photo,
    });
    return res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Invalid Request",
      error: err,
    });
  }
};
exports.getAllPost = async (req, res, next) => {
  try {
    // const { userName } = req.params;
    //const { ObjectId } = mongoose.Types;
    const { userId, category } = req.query;
    const myResult = await Post.aggregate([
      {
        $match: userId
          ? { userId: new mongoose.Types.ObjectId(userId) }
          : category
          ? {
              category: {
                $in: [category],
              },
            }
          : {},
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $sort: { createdAt: -1 },
      },
    ]);
    return res.status(201).json({
      message: "Success",
      data: myResult,
    });
    //     console.log(`....my result.....${myResult}`);
    //    // const { userId, category } = req.query;
    //     let posts;
    //     if (userId) {
    //         posts = await Post.find({ userId }).select({ __v: 0 });
    //     } else if (category) {
    //         posts = await Post.find({
    //             category: {
    //                 $in: [category],
    //             },
    //         }).select({ __v: 0 });
    //     } else {
    //         posts = await Post.find().select({ __v: 0 });
    //     }
    // // const posts = await Post.find();
    // return res.status(201).json({
    //     message: 'Success',
    //     data: posts,
    // });
  } catch (err) {
    return res.status(401).json({
      message: "Server error!",
      error: err,
    });
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    var id = new mongoose.Types.ObjectId(postId);
    console.log(`_id.......${id}`);
    const myResult = await Post.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(postId)},
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);
    return res.status(201).json({
      message: "Success",
      data: myResult,
    });
    // const singlepost = await Post.findById(postId).select({ __v: 0 });
    // // const posts = await Post.find();
    // return res.status(201).json({
    //     message: 'Success',
    //     data: singlepost,
    // });
  } catch (err) {
    return res.status(401).json({
      message: "Server error!",
      error: err,
    });
  }
};
exports.updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(401).json({
        message: "Failed!!   You can only update your post",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    return res.status(201).json({
      message: "Successfully Updated",
      data: updatedPost,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Server Error",
      error: err,
    });
  }
};
exports.updateAnyField = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(401).json({
        message: "Failed!!   You can only update your post",
      });
    }

    const updatedPost = await Post.findOneAndUpdate({ _id: postId }, req.body, {
      new: true,
    });
    return res.status(201).json({
      message: "Successfully Updated",
      data: updatedPost,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Server Error",
      error: err,
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(401).json({
        message: "Failed!!   You can only delete your post",
      });
    }

    const updatedPost = await Post.findByIdAndDelete(postId);
    return res.status(201).json({
      message: "Successfully Deleted",
      data: updatedPost,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Server Error",
      error: err,
    });
  }
};
