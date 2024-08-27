# Catch Game Web Application

[Project Description]

- Game: A catch game that able to move the catcher left and right to catch the items.
- Leaderboard: Display the top 100 players score.

## Prerequisites

- Node.js
- npm
- MongoDB

## Installation

1. Clone the repository:
   git clone [https://github.com/jenna-dev/catcher.git]

2. Install dependencies for the frontend and backend:

- cd your-repo
- cd client
- npm install

- cd server
- npm install

3. Set up environment variables:

- Create a `.env.example` file to `.env` in the `client` directory of the project.
- replace REACT_APP_API_BASE_URL to backend api base URL

- copy `.env.example` fil to `.env` in the `server` directory of the project.
- add MONGODB_URI to your mongoDB connection string

4. Start the development server:

- cd client
- npm start

- cd server
- npm start

## Project Structure

The project is divided into two main parts:

1. **Frontend (React)**: The client-side of the application, located in the `client` directory.
2. **Backend (Node.js)**: The server-side of the application, located in the `server` directory.

## API Documentation

### General Information

- Base URL: `http://localhost:5001/api/v1`
- Authentication: None

### Endpoints

#### Get Top Scores

Retrieves the top 100 scores.

- **Endpoint**: `GET /leaderboard`
- **Response**: An array of score objects, sorted by score in descending order limit to 100.

#### Add Score

Adds a new score to the leaderboard.

- **Endpoint**: `POST /leaderboard`
- **Request Body**:
- `username` (string): The player's username.
- `score` (number): The player's score.
- **Response**: The newly created score object.
