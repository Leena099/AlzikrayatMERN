const Comment = require('../models/Comment');
const Photo = require('../models/Photo');

exports.getByPhoto = async (req, res, next) => {
    try{
        const comments = await Comment.find(
            {photoId: req.params.id}).populate('userId', 'firstName lastName').sort({dateTime: 1});
        
        res.json(comments);
    } catch (err) {
        next(err);
    }
}

exports.create = async (req, res, next) => {
    try {const photo = await Photo.findById(req.params.id);
        if (!photo) 
            return res.status(404).json({message: 'Photo not found'});
    const comment = await Comment.create({
        photoId:req.params.id,
        userId: req.body.userId,
        comment: req.body.comment
    });
    await comment.populate('userId', 'firstName lastName');

        await comment.populate('userId', 'firstName lastName');

    const io = req.app.get('io');
    io.to(`photo:${req.params.id}`).emit('newComment', comment);

    res.status(201).json(comment);
   } catch (err) {
    next(err);
   }
};

exports.remove = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId.toString() !== req.body?.userId) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }

    await comment.deleteOne();
    req.app.get('io').to(`photo:${comment.photoId}`).emit('commentDeleted', comment._id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
};