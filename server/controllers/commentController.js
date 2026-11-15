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
    res.status(201).json(comment);
   } catch (err) {
    next(err);
   }
};