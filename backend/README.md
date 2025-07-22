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
   DB_NAME=vasarosProjektas
   DB_USER=postgres
   DB_PASSWORD=postgres
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

## Endpoints

-`POST /api/v1/login` - Login
   -Body: `{ "email": "Example email", "password": "Example password"}`
-`POST /api/v1/signup` - Signup
   -Body: `{ "email: "Example email", "password": "Example password", "passwordconfirm": "Example passwordconfirm"}`
-`GET /api/v1/logout` - Logout

Tour Managment
-`POST /api/v1/excursions` - add a Tour
   -body: `{ "title": "example title", "photo_url": "example photo_url", "duration": "example duration", "dates": "example date", "price": "example price", "category_id": "example category_id", "description": "example description", "location": "example location" }`
-`PUT /api/v1/excursions/:id` - edit Tour
   -body: `{ "title": "example title", "photo_url": "example photo_url", "duration": "example duration", "dates": "example date", "price": "example price", "category_id": "example category_id", "description": "example description", "location": "example location" }`
-`DELETE /api/v1/excursions/:id` - delete a Tour by id