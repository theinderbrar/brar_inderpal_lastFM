# Music Search App

The Music Search App is a web application that allows users to search for songs and artists, view details, and manage their favorite artists. It integrates with Last.fm API to retrieve music data and provides a user-friendly interface for seamless music exploration.


## Features

- Search for artists
- Add favorite artists to your collection
- Remove artists from your collection
- LogIn/SignUp

## Technologies Used

- Vue.js - JavaScript framework for building user interfaces
- Axios - Promise-based HTTP client for making API requests
- Last.fm API - API for retrieving music-related data
- Express.js - Web application framework for handling server-side logic
- MySQL - Relational database management system for storing user and artist data

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/theinderbrar/brar_inderpal_lastFM.git
    ```
2. Install the dependencies:

    ```bash
    cd brar_inderpal_lastFM
    npm install
    ```

3. Set up the backend:
    Install MySQL and change the credentials in `db.js` file.
    Default values are `root@localhost` with password `root`. 
    Create a MySQL database and import the provided SQL file.
    Configure the database connection in the server/db.js file.

4. Start the development server:
    ```bash
    npm run dev
    ```
5. Access the app in your browser at http://localhost:5000.


## Usage

- Enter a artist name in the search bar and click the "Search" button.
- View the search results and click on artist to see favourite.
- To add an artist to your favorites, click on the heart icon. The button color will change to red.
- To remove an artist from your favorites, click on the heart icon again. The button color will change to white.
- Head to the My Albums section to access a comprehensive list of albums from your favorite artists.

## License

This project is licensed under the MIT License.

