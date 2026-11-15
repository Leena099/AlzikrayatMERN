const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const photoController = require('../controllers/photoController');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({
    storage,
    filefilter: (req, file, cb) => cb(null, file.mimetype.startswith('image/')),
    limits: {fileSize: 5 * 1024 * 1024}
});

router.get('/', photoController.getAll);
router.get('/:id', photoController.getOne);
router.post('/', upload.single('image'), photoController.create);

module.exports = router;