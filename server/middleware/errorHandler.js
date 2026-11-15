module.exports = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid ID' });
  if (err.name === 'MulterError') return res.status(400).json({ message: err.message });
  res.status(500).json({ message: 'Server error' });
};