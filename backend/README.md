# Backend - Express Server

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file (see `.env.example` for reference):

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=summer
   DB_USER=student
   DB_PASSWORD=goodPassword
   ```

3. Start the server:
   ```bash
   npm run dev
   ```


## Endpoints

- `GET /` - Returns a welcome message.

### Example API

- `POST /api/v1/examples` - Create a new example
  - Body: `{ "name": "Example name", "recipe": "Example recipe" }`
- `GET /api/v1/examples/:name` - Get all examples by name

### Login/register API

-`POST /api/v1/login` - Login
   -Body: `{ "email": "Example email", "password": "Example password"}`
-`POST /api/v1/signup` - Signup
   -Body: `{ "email: "Example email", "password": "Example password", "passwordconfirm": "Example passwordconfirm"}`
-`GET /api/v1/logout` - Logout
