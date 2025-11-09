# Short-ly - Full-Stack URL Shortener 

## 1. Project Overview

This is a complete, full-stack URL shortening service built from scratch to demonstrate proficiency in a modern, high-demand tech stack: React, TypeScript, Node.js, and Docker.

The project mimics the core functionality of services like Bitly or TinyURL and serves as a practical, end-to-end example of modern software development, from the frontend UI to the backend API, database integration, and DevOps containerization.

## 2. The Problem & Goal

This project was strategically built to fill a specific gap and showcase a unique combination of skills:

* **Fills the Gap:** While my professional experience is in .NET, this project serves as a recent, high-quality, end-to-end example of my mastery of the React, TypeScript, and Node.js stack, which is required by many modern startups.
* **Leverages DevOps Strength:** My 3.5 years of experience include CI/CD and Docker. This project proves those skills in a personal, demonstrable way by containerizing the entire stack with Docker Compose.
* **Solves a Classic Problem:** Building a URL shortener is a well-respected systems design problem, demonstrating a strong understanding of REST APIs, database design, and key-generation services.

In short, this project was designed to be the most "bang-for-your-buck" portfolio piece, filling my biggest technical gap (Node.js/TypeScript) while simultaneously showcasing my biggest strength (DevOps).

## 3. Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Backend:** Node.js, React, Vite
* **Database:** PostgreSQL
* **Containerization:** Docker & Docker Compose

## 4. Key Features & Implementation

This project is composed of three services working in concert, all defined in the docker-compose.yml file.

* **client (Frontend):** A clean React UI (written in TypeScript) that provides a simple input field. It sends a long URL to the backend API.
* **server (Backend):** A Node.js/Express API (written in TypeScript) that:
    1. Receives the long URL from the client.
    2. Generates a unique, short code.
    3. Saves the long_url and short_code pair to the PostgreSQL database.
* **db (Database):** A PostgreSQL container that:
    1. Persists all URL data.
    2. Is automatically initialized on its first run by an init.sql script, which creates the required urls table.
 
## 5. How to Run

The entire stack can be built and run with one command.

**Prerequisites**

* Git
* Docker (which includes docker compose)

**Local Setup**
1. **Clone the repository:** git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
                             cd YOUR-REPO-NAME
2. **Build and Run the Containers:** docker-compose up --build -d
3. Use the Application: Open your browser and navigate to http://localhost:8080.

## 6. Challenges & What I Learned

This project was a fantastic exercise in system design and end-to-end debugging.

* **Full-Stack Orchestration:** I learned how to successfully define and network three independent Docker containers (client, server, db) and manage their startup order using depends_on.
* **Database Lifecycle:** I implemented a robust database initialization using a custom init.sql script and a persistent Docker volume. This included debugging the new volume path requirements for modern Postgres (18+) images.
* **End-to-End Debugging:** I practiced debugging a full application stack, which involved tracing a user request from the React frontend, through the Node.js API, and finally to the SQL query being executed in the database.
* **TypeScript Integration:** I successfully implemented TypeScript on both the React frontend and the Node.js backend, ensuring type safety and a more robust codebase.
