# exampleController.js

This controller provides request handlers for working with examples using Express and the model functions from `modelExample.js`.

## Functions

### createExampleController(req, res)
Handles POST requests to create a new example.
- **Request Body:**
  - `name` (string): The name of the example.
  - `recipe` (string): The recipe for the example.
- **Response:**
  - `201 Created` with the created example object on success.
  - `500 Internal Server Error` with error message on failure.

### getExampleByNameController(req, res)
Handles GET requests to fetch examples by name.
- **Request Params:**
  - `name` (string): The name of the example to search for.
- **Response:**
  - `200 OK` with an array of examples matching the name.
  - `500 Internal Server Error` with error message on failure.


## Related Files
- Model functions: `../models/modelExample.js`
