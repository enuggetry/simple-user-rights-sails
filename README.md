# Example application to learn how to use policies for access control.
Simple Nodejs + Sailsjs application that allows authenticated users to post up to 3 messages. It allows the users to remove their own messages. The application creates 2 admin users during bootstrap. These admin users can post as many messages as they want and also can edit other users.

## Runing the example
1. Clon the repository

2. Install the project dependencies

	```sh
	$ cd simple-user-rights-sails
	$ npm install
	```
3. Start the app

	```sh
	$ sails lift
	```

The admin users are defined in "config/bootstrap.js" and are created when the app is lifted.

This application uses the variable **rights** inside the **User** model to control the access to some methods.

The variable **user.rights** is an integer value that is used as follows. Values lower than 10 are considered admin users.
	- ADMIN = 0; 
	- MODERATOR=1; 
	- ... ;
	- USER=10:
	- ...;


