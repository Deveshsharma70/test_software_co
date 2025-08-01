const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();
  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  const search = req.query.q || '';
  const users = await User.find({
    $or: [
      { firstName: new RegExp(search, 'i') },
      { lastName: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
    ]
  }).populate({
    path: 'role',
    select: 'roleName accessModules -_id'
  });
  res.json(users);
};

exports.checkModuleAccess = async (req, res) => {
  const { userId, module } = req.params;
  const user = await User.findById(userId).populate('role');
  if (!user) return res.status(404).send('User not found');
  res.send({ hasAccess: user.role.accessModules.includes(module) });
};

exports.bulkUpdateSame = async (req, res) => {
  const { field, value } = req.body;
  await User.updateMany({}, { $set: { [field]: value } });
  res.send('Updated');
};

exports.bulkUpdateDifferent = async (req, res) => {
  const updates = req.body;
  const bulkOps = updates.map(u => ({
    updateOne: {
      filter: { _id: u.id },
      update: { $set: u.fields }
    }
  }));
  await User.bulkWrite(bulkOps);
  res.send('Bulk update done');
};