# vasarosProjektasJs
---

### 📦 Fullstack App with Docker Compose

This project includes:

* PostgreSQL database
* Backend (Node.js)
* Frontend (Vite + JavaScript)

---

### 🚀 Getting Started

#### 1. **Install Docker and Docker Compose**

Make sure Docker and Docker Compose are installed on your system:

```bash
docker --version
docker compose version
```

---

#### 2. **Project Structure**

```
project-root/
│
├── backend/         # backend Node.js app
│   ├── Dockerfile
│   └── ...
│
├── frontend/        # Vite frontend app
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml
└── README.md
```

---

#### 3. **Build and Start All Services**

From the root directory:

```bash
docker-compose up --build
```

This will:

* Build and start the backend at [http://localhost:3000](http://localhost:3000)
* Start the Vite dev server at [http://localhost:5173](http://localhost:5173)
* Create a PostgreSQL database (host: `db`, user: `student`, password: `goodPassword`, db: `summer`)

---

#### 4. **Stop the Services**

To stop all services:

```bash
docker-compose down
```

To remove volumes too (i.e., reset the database):

```bash
docker-compose down -v
```

---

#### 5. **Debugging Tips**

* If the frontend is not accessible, make sure Vite is configured to use `--host`.
* If things run slowly, avoid mounting `node_modules`, or use Docker's `host` networking mode on Linux.

