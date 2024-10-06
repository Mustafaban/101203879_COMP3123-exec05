const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
app.use(express.json());

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  res.sendFile('home.html', { root: __dirname }); 
});

/*
- Return all details from user.json file to client as JSON format
*/

router.get('/profile', (req, res) => {
  fs.readFile('user.json', (err, data) => {
    if (err) {
      return;
    }
    const userData = JSON.parse(data);
    res.json(userData);
  });
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
  const { username, password } = req.body; 

  
  fs.readFile('user.json', (err, data) => {
    if (err) {
      
      return;
    }
    const users = JSON.parse(data);
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.json({ status: false, message: "User Name is invalid" });
    }

    if (user.password !== password) {
      return res.json({ status: false, message: "Password is invalid" });
    }

    res.json({ status: true, message: "User Is valid" });
  });
});


/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req, res) => {
  const username = req.query.username; 
  const message = `<b>${username} successfully logged out.</b>`;
  res.send(message); 
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).send('Server Error'); 
});