const express = require("express"); 

const app = express(); 
const router = express.Router(); /* specific for url */ 
const port = 3000; 

app.get("/", (req, res) => {
    res.send("Hello World!"); 
});

app.listen(port, () => {
    console.log("Server running on port 3000!");
});