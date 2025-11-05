const express = require("express");
const session = require("express-session");
const { Issuer, generators } = require('openid-client');
const { uploadPhoto } = require("./s3Logic");
const { uploadCaption, createDatabase } = require("./sqlLogic");

const app = express();
const router = express.Router(); /* specific for url */
const port = 3000;

// aws sign in logic 
// configuring openid-client
let client; 
async function initializeClient() {
    const issuer = await Issuer.discover('https://cognito-idp.us-east-2.amazonaws.com/us-east-2_a63MiRqET');
    client = new issuer.Client({
        client_id: 'hp6206gv0djolp2qn5gbsnt1q',
        client_secret: process.env.AWS_COGNITO_CLIENT,
        redirect_uris: ['http://localhost:3000/callback'],
        response_types: ['code']
    });
};
initializeClient().catch(console.error);

// configuring session middleware
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}));

// redirect to login url
app.get('/login', (req, res) => {
    const nonce = generators.nonce();
    const state = generators.state();

    req.session.nonce = nonce; 
    req.session.state = state; 

    const authUrl = client.authorizationUrl({
        scope: 'email openid phone',
        state: state,
        nonce: nonce, 
    })

    res.redirect(authUrl); 
})

// from login redirect back to signup
app.get('/callback', async (req, res) => {
    try {
        const params = client.callbackParams(req);
        const tokenSet = await client.callback(
            "http://localhost:3000/callback",
            params,
            {
                nonce: req.session.nonce,
                state: req.session.state
            }
        );

        const userInfo = await client.userinfo(tokenSet.access_token);
        req.session.userInfo = userInfo; 

        res.redirect('http://localhost:5173/');
    } catch (err) {
        console.error('Callback error: ', err);
        res.redirect('http://localhost:5173/');
    }
})

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
