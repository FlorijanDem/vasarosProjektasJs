# exampleRoutes.js

This file defines Express routes for working with examples, using controllers from `../controllers/exampleController.js`.

## Routes

### POST /examples
Creates a new example.
- **Request Body:**
  - `name` (string): The name of the example.
  - `recipe` (string): The recipe for the example.
- **Response:**
  - `201 Created` with the created example object on success.
  - `500 Internal Server Error` with error message on failure.

### GET /examples/:name
Fetches all examples with the specified name.
- **Request Params:**
  - `name` (string): The name of the example to search for.
- **Response:**
  - `200 OK` with an array of examples matching the name.
  - `500 Internal Server Error` with error message on failure.

## Usage Example

Import and use this router in your Express app:

```js
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api/v1', exampleRoutes);
```

## Related Files
- Controller functions: `../controllers/exampleController.js`
- Model functions: `../models/modelExample.js`
