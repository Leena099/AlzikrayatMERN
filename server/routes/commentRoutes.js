const router = require('express').Router({ mergeParams: true });
const commentController = require('../controllers/commentController');
const { comment, validate } = require('../middleware/validation');

router.get('/', commentController.getByPhoto);
router.post('/', validate(comment), commentController.create);

module.exports = router;