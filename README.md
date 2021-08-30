# Bloglist backend

https://enigmatic-forest-29475.herokuapp.com/

This is a web app deployed on Heroku and based upon suggested exercises from fullstackopen.com to implement a full stack app where logged in users can share links of blogs and like ones shared by other users.

The server-side REST API is implemented with Node.js and Express.

Currently the React frontend is functional with limited styling, albeit with less functionality than the backend allows (such as deleting shared blogs).

There is currently no interface for creating new users, so guest users can log in as "guest" with a password of "a1".

Data is is stored in a NOSQL document database on MongoDB Atlas.

The backend is tested using the Jest and the supertest libraries.

User authentication for logging in is done using the bcrypt and jsonwebtoken packages.

Frontend react code is in https://github.com/GeorgeCLu/bloglist-frontend
