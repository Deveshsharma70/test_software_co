const Role = require('../models/Role');

exports.createRole = async (req, res) => {
  const role = new Role(req.body);
  await role.save();
  res.status(201).json(role);
};

exports.getRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};

exports.updateAccessModules = async (req, res) => {
  const { id } = req.params;
  const { action, module } = req.body;

  const role = await Role.findById(id);
  if (!role) return res.status(404).send('Role not found');

  if (action === 'add') {
    if (!role.accessModules.includes(module)) {
      role.accessModules.push(module);
    }
  } else if (action === 'remove') {
    role.accessModules = role.accessModules.filter(m => m !== module);
  }

  await role.save();
  res.json(role);
};