# Booking App

This is a web booking management application built with Angular and Node.js, running in Docker containers for easy deployment.


## Table of Contents
1. [Running the Application](#running-the-application)
2. [Prerequisites](#prerequisites)
3. [Steps to Run the Application](#steps-to-run-the-application)
4. [API Documentation](#api-documentation)
5. [Diagrams](#diagrams)



## Running the Application

This guide will walk you through the process of running the application using Docker. Please follow each step carefully to ensure everything runs smoothly.

## Prerequisites

Before you start, ensure Docker is installed and running on your system. You can download Docker Desktop from [here](https://www.docker.com/products/docker-desktop). To verify that Docker is installed correctly and running, open your terminal or command prompt and run the following command:

```bash
docker info
```
If Docker is installed and running correctly, you should see the information about the Docker client and server. If you encounter any issues, please refer to the [Docker documentation](https://docs.docker.com/get-docker/) for installation instructions.


## Steps to Run the Application

### 1. Clone the Repository

First, clone the repository of the application to your local machine. Open your terminal or command prompt and run the following command:


```bash
git clone https://github.com/Milton090/bookingApp.git
```

### 2. Configure the `.env` File (Optional)

The `.env` file is used to store environment variables that your application needs to function correctly. This file is optional but recommended for configuring specific parameters for your environment.

#### Create the `.env` File

1. Navigate to the root of the project in your terminal or command prompt:

    ```bash
    cd bookingApp
    ```

2. Create a `.env` file in the root of the project:

    #### On Linux/macOS:

    ```bash
    touch .env
    ```

    #### On Windows (PowerShell):

    ```powershell
    New-Item -Path .env -ItemType File
    ```

    #### On Windows (CMD):

    ```cmd
    echo.> .env
    ```

3. Open the `.env` file in your text editor and add the necessary environment variables. Here is an example of what to include:

    ```env
    CLIENT_PORT='4200'
    SERVER_PORT='4000'
    DB_PORT=1433
    SA_PASSWORD='yourSAP4ssw0rd#'
    JWT_SECRET='yourJWT$ecret'
    ```

    - `SA_PASSWORD`: Ensure it meets the complexity requirements for SQL Server passwords. It should be at least 8 characters long and contain characters from three of the following categories: uppercase letters, lowercase letters, numbers, and symbols.
    - `JWT_SECRET`: This is the secret key used to sign the JSON Web Tokens (JWT) for authentication. It should be a long, random string for security purposes.

> **Note:** If you do not configure the `.env` file, the application will run with default values provided in the `docker-compose.yml` file. The default configuration should be sufficient for most use cases. Only modify the `.env` file if you need to change the default values in case of port conflicts or other issues.

> **Important:** If you change the `SERVER_PORT` in the `.env` file, you **must** update the `apiUrl` in the `environment.ts` file located at `client/src/app/environment/`. The value should be `http://localhost:<SERVER_PORT>/api/`.


### 3. Run Docker Compose

Docker Compose will start the frontend, backend, and database services. To do so:

1. Ensure you are in the project root where `docker-compose.yml` is located:
    ```bash
    cd bookingApp
    ```

2. Run the following command:
    ```bash
    docker compose up
    ```

This command will build and run the Docker containers. It might take a few minutes on the first run.


### 4. Verify the Application

- Frontend: Visit `http://localhost:CLIENT_PORT/` (default `4200`).
- Backend API: Test the backend at `http://localhost:SERVER_PORT/api/welcome` (default `4000`).


## Additional Information

### API Documentation

You can find the API documentation [here](https://www.postman.com/aerospace-specialist-44844858/workspace/miltonramirezpublic/collection/33019708-7b1c2ccd-3d46-4c0f-92df-42b645af7d6f?action=share&creator=33019708) on Postman.


### Diagrams

#### Database Relational Diagram
This diagram illustrates the relationships between entities in the database.

![Database Relational Diagram](./databaseDiagram.jpeg "A diagram showing the relationships between database entities.")

#### Architecture Diagram
The architecture diagram shows the interactions between the frontend, backend, and database.

![Architecture Diagram](./architectureDiagram.jpeg "A diagram showing the interactions between the frontend, backend, and database.")