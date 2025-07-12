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

// NCR Table data route
const ncrdata = require('./data/ncrTabularIndividual.json');
app.get('/api/ncrtabledata', (req, res) => {
  res.json(ncrdata);
});

// NCR Table data route For Project
const ncrprojectdata = require('./data/ncrTabularProject.json');
app.get('/api/ncrprojecttabledata', (req, res) => {
  res.json(ncrprojectdata);
});

// NCR Chart data route
// const ncrchartdata = require('./data/ncrChartIndividual.json');
const ncrchartdata = require('./data/ncrChartIndividualData.json');
app.get('/api/ncrchartdata', (req, res) => {
  res.json(ncrchartdata);
});

// NCR Chart data route For Project
// const ncrchartprojectdata = require('./data/ncrChartProject.json');
const ncrchartprojectdata = require('./data/ncrChartProjectData.json');
app.get('/api/ncrchartprojectdata', (req, res) => {
  res.json(ncrchartprojectdata);
});


// Read Advance filter
const filePath = require('./data/AdvanceSearch.json');
app.get('/api/advanceFilter', (req, res) => {
 res.json(filePath);
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