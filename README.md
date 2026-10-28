# To-Do Node.js Docker App

## Introduction

A full-stack to-do application built with **React**, **Express.js**, **MySQL**, and **Docker**. This application demonstrates modern containerization practices using Docker Compose to orchestrate multiple services with Traefik as a reverse proxy.

The app provides a clean, intuitive interface for managing your daily tasks with a robust backend API for authentication and data persistence.

---

## Features

✨ **User-Friendly Interface** - Clean and responsive React frontend for task management

💾 **Data Persistence** - MySQL database for reliable task storage

🐳 **Containerized** - Fully dockerized application for easy deployment

⚙️ **Microservices** - Separated frontend, API, and database services

🔀 **Reverse Proxy** - Traefik for intelligent request routing

📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

---

## Project Structure

```
To-Do-NodeJs-Docker-App/
├── api/                          # Express.js backend API service
│   ├── .dockerignore            # Docker ignore rules for API
│   ├── Dockerfile               # API container configuration
│   └── code/                    # Application source code
│       ├── db.js                # MySQL connection setup
│       ├── server.js            # Main Express server entry point
│       ├── package.json         # Backend dependencies and scripts
│       ├── package-lock.json    # Locked backend dependency versions
│       ├── middleware/          # Route middleware
│       └── routes/              # API endpoints
├── frontend/                    # React frontend application
│   ├── .dockerignore            # Docker ignore rules for frontend
│   ├── Dockerfile               # Frontend container configuration
│   └── code/                    # Frontend source code
│       ├── index.html           # HTML entry file
│       ├── package.json         # Frontend dependencies and scripts
│       ├── package-lock.json    # Locked frontend dependency versions
│       ├── vite.config.js       # Vite configuration
│       └── src/                 # React application source
├── mysql/                       # MySQL database setup
│   └── init.sql                 # Database initialization script
├── docker-compose.yaml          # Multi-container orchestration config
├── README.md                    # Project documentation
└── .git/                        # Git repository metadata
```

---

## Technology Stack

| Service | Technology | Version |
|---------|-----------|---------|
| **Frontend** | React, Vite, Axios | 18.2.0, 5.0.0, 1.6.0 |
| **Backend** | Express.js, Node.js | 4.18.2, 20-alpine |
| **Database** | MySQL | 8.0 |
| **Authentication** | JWT, bcryptjs | 9.0.2, 2.4.3 |
| **Reverse Proxy** | Traefik | 2.11 |
| **Container Runtime** | Docker & Docker Compose | Latest |

---

## How to Run with Docker Compose

### Prerequisites

- Docker installed on your system ([Download Docker](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)

### Start the Application

Run the following command from the project root directory:

```bash
docker-compose up -d
```

This will:
- Build the React frontend (multi-stage build with Nginx)
- Build the Express.js API
- Start the MySQL database
- Start Traefik reverse proxy
- Set up networking between all services

### Access the Application

Once all services are running:

- **Frontend**: http://localhost or http://external_IP
- **Traefik Dashboard**: http://localhost:9090 or http://external_IP:9090

### View Logs

To view real-time logs from all services:

```bash
docker-compose logs -f
```

To view logs from a specific service:

```bash
docker-compose logs -f [service-name]
# Example: docker-compose logs -f api
```

---

## How to Stop the Application

### Stop All Services

To stop all running containers:

```bash
docker-compose stop
```

### Stop and Remove Containers

To stop all containers and remove them (volumes are preserved):

```bash
docker-compose down
```

### Stop and Remove Everything (Including Data)

To remove containers, networks, and volumes (⚠️ this will delete database data):

```bash
docker-compose down -v
```

### Stop a Specific Service

To stop only one service:

```bash
docker-compose stop [service-name]
# Example: docker-compose stop api
```

---

**Ready to use!** Your application will be accessible immediately after the containers start. Check the logs if you encounter any issues during startup.
