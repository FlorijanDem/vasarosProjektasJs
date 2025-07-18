# modelExample.js

This file demonstrates simple usage of `postgres.js` for interacting with a PostgreSQL database in a Node.js backend. It provides example functions for working with an `examples` table.

## Functions

### createExample(name, recipe)
Creates a new example in the `examples` table.

- **Parameters:**
  - `name` (string): The name of the example.
  - `recipe` (string): The recipe for the example.
- **Returns:** The newly created example row.

### getExampleByName(name)
Fetches all examples with the specified name from the `examples` table.

- **Parameters:**
  - `name` (string): The name of the example to search for.
- **Returns:** An array of example rows with the given name.
- **Note:** If you want to fetch a unique example, use an ID instead, as multiple examples can have the same name.

## Usage Example

```js
const { createExample, getExampleByName } = require('./modelExample');

// Create a new example
createExample('Example Name', 'Example recipe...')
  .then(result => console.log(result))
  .catch(err => console.error(err));

// Get examples by name
getExampleByName('Example Name')
  .then(examples => console.log(examples))
  .catch(err => console.error(err));
```

## Database Connection

The database connection is imported from `../utils/postgres.js`. Update your connection settings in that file as needed.

## Table Structure Example

```sql
CREATE TABLE examples (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  recipe TEXT NOT NULL
);
```
