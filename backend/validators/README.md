# Validators - exampleValidation.js

This file contains validation middleware for Express routes using `express-validator`. These validators are used to check and sanitize input for the example endpoints.

## Exports

### validateCreateExample
Validates the request body for creating a new example.
- Requires:
  - `name` (string, not empty)
  - `recipe` (string, not empty)

### validateGetExampleByName
Validates the request params for fetching examples by name.
- Requires:
  - `name` (string, not empty)

## Usage Example

```js
const { validateCreateExample, validateGetExampleByName } = require('../validators/exampleValidation');

router.post('/examples', validateCreateExample, createExampleController);
router.get('/examples/:name', validateGetExampleByName, getExampleByNameController);
```

## Related Files
- Controller: `../controllers/exampleController.js`
- Model: `../models/modelExample.js`
