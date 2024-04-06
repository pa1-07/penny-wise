const express = require('express');
const app = express()

// Define API routes for expenses

app.get("/get", (req, res) => {
    res.send("<h1>Hello server<h1>") 
})

module.exports = app;
