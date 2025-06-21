const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

const categories = require('./data/categories.json');

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send("Server is running");
});

app.get('/categories', (req, res) => {
    res.send(categories); 
})


// Project-Tree-Data from JSON
const projects =  require('./data/projectTreeData.json');

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Table data route
const data = require('./data/tabulardata.json');
app.get('/api/tabledata', (req, res) => {
  res.json(data);
});

// Load users from JSON
const users = require('./data/users.json');

app.post('/api/auth/login', (req, res) => {
  const { userName, password } = req.body;
  const matchedUser = users.find(user => user.userName === userName && user.password === password);

  console.log("username", userName)
  console.log("password", password)

  if (!matchedUser) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const user = {
    userName: matchedUser.userName,
    email: `${matchedUser.userName}@example.com`,
    avatar: `/assets/Logos/${matchedUser.userName}.jpg`
  };

  res.json(user);
});

app.listen(port, () => {
    console.log(`Server (categories) is running on port: ${port}`);
})