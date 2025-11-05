
const express = require("express");

const { Issuer, generators } = require('openid-client');

const router = express.Router(); 

// aws sign in logic 
// configuring openid-client
let client; 
async function initializeClient() {
    const issuer = await Issuer.discover('https://cognito-idp.us-east-2.amazonaws.com/us-east-2_KBTpzyH3D');
    client = new issuer.Client({
        client_id: '13ofb4hfvvukatfpg4847js6qp',
        client_secret: process.env.AWS_COGNITO_CLIENT,
        redirect_uris: ['http://localhost:3000/callback'],
        response_types: ['code']
    });
};

// redirect to login url
router.get('/login', (req, res) => {
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
router.get('/callback', async (req, res) => {
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

router.get('/get-authenticated', (req, res) => {
    if (req.session.userInfo) {
        res.json({ isAuthenticated: true, user: req.session.userInfo});
    } else {
        res.json({ isAuthenticated: false }); 
    }
})

module.exports = { router, initializeClient}; 