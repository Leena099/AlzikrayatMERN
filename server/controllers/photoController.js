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






