# Todo App

This project is a full stack Todo application built using React with Vite for the frontend and Spring Boot for the backend. The project demonstrates the integration of a modern frontend framework with a robust backend, incorporating features such as authentication with JWT, CRUD operations, and in-memory database storage with H2.

## Features

- User authentication with JWT
- Create, Read, Update, Delete (CRUD) operations for Todo items
- Integration of frontend and backend using Axios
- Usage of major React hooks like `useNavigate`, `useParams`
- Authentication context setup in React
- In-memory H2 database with a console for development

## Tech Stack

**Frontend:**
- React
- Vite
- Axios
- React Router

**Backend:**
- Spring Boot
- Spring Data JPA
- Spring Security
- H2 Database

## Prerequisites

- Node.js (v14 or higher)
- Java (JDK 11 or higher)
- Maven

## Getting Started

### Frontend Setup

1. Clone the repository:
   ```bash
    git clone https://github.com/yourusername/todo-app.git
    cd todo-app/frontend
  
2. Install the dependencies:
  ```bash
    npm install
  ```
3. Start the development server:
  ```bash
    npm run dev
  ```


### Backend Setup

1.Navigate to the backend directory:
  ```bash

   cd todo-app/backend
```

2. Build the project using Maven:

```bash

  mvn clean install
```

3.Run the Spring Boot application:
```bash
 mvn spring-boot:run
```

The backend server will start on http://localhost:8080.


# Authentication


## JWT Configuration

JWT (JSON Web Token) is used for securing the API endpoints. The setup includes configuring Spring Security to use JWT for authentication and authorization.

### Key components include:

    - JwtAuthenticationFilter for validating the tokens.
    - JwtUtil for generating and parsing tokens.
    - SecurityConfig for configuring security settings.

## Setting Up Auth Context in React

An authentication context is created to manage the authentication state across the React application.

## Key hooks used:

    useNavigate for programmatic navigation.
    useParams for accessing route parameters.

## CRUD Operations

The application supports basic CRUD operations for Todo items. The backend provides RESTful endpoints, and the frontend interacts with these endpoints using Axios.
Endpoints

    GET /todos: Fetch all todos
    POST /todos: Create a new todo
    GET /todos/{id}: Fetch a todo by ID
    PUT /todos/{id}: Update a todo by ID
    DELETE /todos/{id}: Delete a todo by ID

# Database

The application uses an in-memory H2 database for development purposes. The H2 console is available at http://localhost:8080/h2-console for querying the database.
## H2 Console Configuration

    JDBC URL: jdbc:h2:mem:testdb
    User Name: sa
    Password: (leave blank)
