## About Time Doctor Project
Bluewater Health has been overwhelmed by the significant number of surgeries required in the aftermath of the Covid-19 pandemic. The company was forced to shut down all non-urgent surgeries for over 14 months, leading to the backlog they are facing now. Thankfully they were able to hire Time Doctor, a software company that has designed time-tracking and scheduling solutions for several industries. You and your colleagues have been hired as the newest group of interns for Time Doctor to work as part of the development team to build a surgery scheduling tool that the administration and hospital staff can use at Bluewater Health.

## Feature Completed Till Date
1. User Login and Signup
2. Creating Roles for user
3. Email and SMS notification
4. User profile update
5. User password update

## Technology Used
1. <b>ReactJS</b> for front-end
2. <b> NodeJS (Express) </b> for back-end
3. <b>MySQL Server </b> for Database
4. <b>Postman</b> for API Testing

## Packages Used 
1. <b>Bycrypt </b> to hash password and verify hashed password
2. <b>JWT (Json Web Token) </b> for assigning token to logged in user for session management
3. <b>Sequelize </b> to create database schema and ORM query
4. <b>SendGrid</b> for email notification 
5. <b>Twilio </b> for SMS notification

## Setting Up project
1. Clone the project using command 
`git clone https://github.com/mepujan/Time_Doctor_Be.git`

2. Install all the packages required using command:
`npm install`

3. Create .env file and include all database configuration and other secret keys as per the `configurations/config.js` file:

4. Create folders `images/profile_picture` in project level directory. This folder consist of all the images uploaded to the database.

5. Create Database name `timedoctor` in mysql.

6. Run the project using commands:
`npm run dev` or
`npm start`


> `npm run dev` runs the server in development mode and use nodemon to auto-reload the server when changes occurs in project.


## Team Members Information
Name | Student Number
--- | ---
Anil Timalsina | c0839704
Gurinder Singh | c0838084
Kanishk Kalra | c0832722
Pujan Gautam | c0842623