const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const { router: cognitoRoutes, initializeClient } = require("./cognitoLogic");
const s3Routes = require("./s3routes");
const sqlRoutes = require("./sqlroutes");

const app = express();
const port = 3000;

// initalizing cognito client
initializeClient().catch(console.error);

// for login cookie
app.use(cookieParser());

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
// AWS S3 route logic - need to update when frontend calls as well
app.use("/s3", s3Routes);
// AWS RDS (SQL) route logic
app.use("/sql", sqlRoutes);

app.listen(port, () => {
    console.log("Server running on port 3000!");
});
