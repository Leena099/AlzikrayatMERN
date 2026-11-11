const bcrypt = require('bcrypt');
const User = require('../models/User');

const publicUser = (user) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
};

exports.register = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;
    const exists = await User.findOne({ email: rest.email.toLowerCase() });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ ...rest, password: hashed });
    res.status(201).json(publicUser(user));
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    res.json(publicUser(user));
  } catch (err) {
    next(err);
  }
};