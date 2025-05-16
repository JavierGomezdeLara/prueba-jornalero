# prueba-jornalero
Github para prueba técnica del jornalero
# Laborer CMS

LCMS is a fullstack CMS that allows to manage laborers information. It is built with React, Typescript, and Vite.

## How It Works

The application consists of two pages:

- List View: This is the main page, featuring a table that displays general information.
- Detail View: Shows all the information about a specific laborer. This view can be accessed by clicking on an laborer name in the list view.

The application's core functionality is validated through end to end tests.

## Current Status

The codebase is disorganized and requires alignment with our current coding standards. We need to refactor and adapt it to ensure consistency and maintainability.

## What Do You Have To Do?

We aim to improve the application by refactoring it to be more reusable, maintainable, and testable. These are the principles we want to follow:

- Typescript good practices
- Clean code
- SOLID principles
- Decoupling
- Unit testing
- Good commits history

You don't need to implement them all. Just keep refining the code until you feel satisfied with it. Any improvement is welcome.

Also, if there is time, our Product Owner has asked us to implement a new feature in order to enable adding new laborers and editing them:

- Add Laborer: Allow users to add a new laborer directly from the list view.
- Edit Laborer: Enable the edition of existing laborer information from the detail view.

## Project Set Up

### Installing and Running the Application

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the application:**

   ```bash
   npm run dev
   ```

   > **Note:** Make sure that the backend application is also running.

3. **Running End-to-End Tests:**

   In addition to the steps above, run in a different terminal:

   ```bash
   npm run cy
   ```

## Backend

### Setting Up the Backend Application

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install the required dependencies:**

   ```bash
   npm install
   ```

3. **Start the backend application:**

   ```bash
   npm start
   ```

   The backend will be running at <http://localhost:3000>.

### API Documentation

You can explore the available endpoints using Swagger UI.

To access it start the backend application and go to <http://localhost:3000/api-docs>.

There you will find an interactive interface to test the API endpoints and explore the documentation.

### Notes

- The database is configured to store data in memory.
