# Alzikrayat Photo Sharing Web Application (MERN Edition)

## Description

Alzikrayat is a full-stack photo-sharing application built with the MERN stack. Users can register to create a new account or log in if they already have one. Logged-in users can upload photos, add comments, and delete their own photos. Everyone can browse the gallery in a grid or list view and open any photo to see its details and comments. The React client talks to an Express REST API, which stores its data in MongoDB.

## Technologies

* React (Vite) and React Router: client interface and page navigation.
* Node.js and Express: REST API (routes, controllers, middleware).
* MongoDB Atlas with Mongoose: database, schemas, and validation.
* bcrypt: password hashing.
* Joi: server-side input validation.
* multer: photo uploads.
* HTML5, CSS3

## How to Run

* Install Node.js (version 18 or newer).
* Create a free MongoDB Atlas cluster and copy its connection string.
* Clone or download this repository.
* Open a terminal in the `server` folder and run `npm install`.
* Create a file named `.env` inside `server` with two lines: `MONGODB_URI=your_connection_string_with_database_name` and `PORT=5000`.
* Start the server with `npm run dev`. It runs on http://localhost:5000.
* Open a second terminal in the `client` folder and run `npm install`, then `npm run dev`.
* Visit http://localhost:5173 in your browser.

## Student Name

Leina