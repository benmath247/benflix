Assignment 1 - using precious react hooks, add the following functionality:

username
email
password

make sure error message is shown if username value is incorrect.

Reminder: use validator

Assignment 2 - use react-toastify to show error message

Assignment 3 - In the Login component create a form that has two input fields email and password

use emailhooks to check for email value

required - keyword

make a http call to the server and you should get back a jwt token

if user is logged in, nav link should change to:
- movie
- profile
- logout

if user refreshes the browser, the app should check if JWTtoken exists. If it does, app should check if it is expired. if it is, login. else, allow user to proceed

after user is logged in, user shouldnt be able to go to /login or /signup
check the token to see if it expires, if it does send the user to login page else /movie

create a custom hook called useUserAuthHook.js. It should:
- check if token exists
- check if token is not expired
- if it is expired, send user to login
    else set user