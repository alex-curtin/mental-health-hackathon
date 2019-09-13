# Moodcast

Moodcast creates a bridge between productivity and self-care through mindfulness and peer support. This application allows users to manage stress more efficiently, ultimately reshaping their outlook to tackle challenges in a positive way.

## Entity Relationship Diagram
![Moodcast ERD](https://live.staticflickr.com/65535/48728260971_af7a7626ca_b.jpg)

## Routes

- /auth/login (POST): When a user logs in, this route is hit and the user is authenticated, sending a JSON Web Token back to the client
- /users/verify (GET) Whenever a user attempts to make any change to the database, this route is hit, sending a request to the database for verification of the current user. This also protects all of the client - side routes.


- /users/:user_id/entries (GET) - this route displays a current user's entries from the database
- /users/:user_id/entries (POST) - this route creates a new task for a user in the database.
- /entries/all (GET) - this route returns all of the entries for all users in the database

