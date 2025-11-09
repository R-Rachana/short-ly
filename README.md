Short-ly: A Full-Stack URL Shortener

This project is a complete full-stack URL shortening service, similar to Bitly or TinyURL. It's fully containerized using Docker and Docker Compose, allowing for a simple, one-command setup.

Features

Frontend: A clean, simple interface (built with React/Vite) to submit a long URL.

Backend: A Node.js (Express) server that handles the logic:

Generates a unique short code.

Saves the long URL and short code to the database.

Database: A PostgreSQL database for persistent storage of all URLs.

Containerized: The entire stack (client, server, database) is managed by docker-compose for easy development and deployment.

Tech Stack

Frontend: React (Vite), JavaScript, CSS

Backend: Node.js, Express

Database: PostgreSQL

Orchestration: Docker, Docker Compose

How to Run

This project is designed to be run with a single command.

Prerequisites

Git

Docker (and Docker Compose, which is included)

Local Setup

Clone the repository:

git clone [https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git](https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git)
cd YOUR-REPO-NAME


Build and Run the Containers:
This single command will build the images for the client and server, start all three containers, and run the database initialization script.

docker-compose up --build -d


Use the Application:
You're all set! Open your browser and go to:
http://localhost:8080

Services

This application runs three main services defined in docker-compose.yml:

client (Port 8080): The React frontend.

server (Port 3001): The Node.js/Express backend API.

db (Port 5432): The PostgreSQL database.

Project Structure

short-ly/
├── docker-compose.yml  # Defines all services, networks, and volumes
├── .gitignore          # Tells Git what files to ignore
├── README.md           # You are here!
|
├── client/             # The React/Vite frontend
│   ├── Dockerfile
│   └── ...
|
├── server/             # The Node.js/Express backend
│   ├── Dockerfile
│   └── ...
|
└── db-init/            # Database initialization scripts
    └── init.sql        # Creates the 'urls' table on first run
