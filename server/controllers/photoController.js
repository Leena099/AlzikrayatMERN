const fs = require('fs');
const path = require('path');
const Comment = require('../models/Comment');

const Photo = require('../models/Photo');

exports.getAll = async (req, res, next) => {
    try {
        const photos = await Photo.find().populate('userId', 'firstName lastName');
        res.json(photos);
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        const photos = await Photo.findById(req.params.id).populate('userId', 'firstName lastName').sort({dateTime: -1});
        if (!photos) 
            return res.status(404).json({message: 'Photo not found'});
        res.json(photos);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        if (!req.file)
            return res.status(400).json({message: 'Image file is required'});
        const {title, description, userId} = req.body;
        if (!title || !userId)
            return res.status(400).json({message: 'Tile and user Id are required'});

        const photo = await Photo.create({userId, fileName: req.file.filename, title, description});
        res.status(201).json(photo);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try{
        const photo = await Photo.findById(req.params.id);
        if (!photo) 
            return res.status(404).json({message: 'Photo not found'});
        if (photo.userId.toString() !== req.body?.userId) {
            return res.status(403).json({message: 'You can only delete your photos'});
        }
        fs.unlink(path.join(__dirname, '../uploads', photo.fileName), () => {}); 
        await Comment.deleteMany({ photoId: photo._id });
        await photo.deleteOne();
        res.json({ message: 'Photo deleted' });
        } catch (err) {
            next(err);
        }
    
};




