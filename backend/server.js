const express = require("express");
const session = require("express-session");
const cors = require("cors")
const { router: cognitoRoutes, initializeClient } = require("./cognitoLogic");
const { router: s3Routes } = require("./s3routes");
const { uploadCaption, createDatabase } = require("./sqlLogic");

const app = express();
const port = 3000;

// initalizing cognito client
initializeClient().catch(console.error);

// cors policy
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// configuring session middleware
app.use(session({
    secret: 'some secret', // need to change to some secret code when production 
    resave: false,
    saveUninitialized: false
}));

// AWS cognito route logic 
app.use("/", cognitoRoutes);
// AWS S3 route logic 
app.use("/upload/", s3Routes);

// uploads caption / post metadata to AWS MySQL 
app.post("/upload-caption", express.json(), async (req, res) => {
    try {
        const data = req.body
        console.log(data.caption); 
        await createDatabase(); 

        res.status(200).send({ success: true });
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Caption not uploaded" })
    }
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
});
