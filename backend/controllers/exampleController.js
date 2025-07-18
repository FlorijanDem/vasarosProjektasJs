const { createExample, getExampleByName } = require('../models/modelExample');
const { validationResult } = require('express-validator');

// Controller to handle creating a new example
async function createExampleController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, recipe } = req.body;
  try {
    const result = await createExample(name, recipe);
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Controller to handle getting examples by name
async function getExampleByNameController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.params;
  try {
    const examples = await getExampleByName(name);
    res.status(200).json(examples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createExampleController,
  getExampleByNameController
};
