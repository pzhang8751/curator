const express = require("express");
const session = require("express-session");
const { router: cognitoRoutes, initializeClient } = require("./cognitoLogic");
const { uploadPhoto } = require("./s3Logic");
const { uploadCaption, createDatabase } = require("./sqlLogic");

const app = express();
const port = 3000;

// initalizing cognito client
initializeClient().catch(console.error);

// configuring session middleware
app.use(session({
    secret: 'some secret', // need to change to some secret code when production 
    resave: false,
    saveUninitialized: false
}));

// AWS cognito route logic 
app.use("/", cognitoRoutes);

// uploads png image to s3 bucket
app.post("/upload-photo", express.raw({ type: "image/png", limit: "10mb" }), async (req, res) => {
    try {
        const id = await uploadPhoto(req.body);

        res.status(200).send({ success: true, id: id });
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Photo not uploaded" })
    }
})

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
