import express from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { Issuer, generators } from 'openid-client';
import dotenv from "dotenv";

dotenv.config();

const router = express.Router(); 

// aws sign in logic 
// configuring openid-client
let client; 
async function initializeClient() {
    const issuer = await Issuer.discover('https://cognito-idp.us-east-2.amazonaws.com/us-east-2_PDQPMnqnn');
    client = new issuer.Client({
        client_id: '7srref3p5poqme58bv5t562dnb',
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
        scope: 'email openid phone profile',
        state: state,
        nonce: nonce, 
    })

    res.redirect(authUrl); 
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {

        res.clearCookie("access_token", {
            httpOnly: false, // local dev - can be false - need to change when production
            secure: false, // local dev - can be false
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.clearCookie("id_token", {
            httpOnly: false, // local dev - can be false - need to change when production
            secure: false, // local dev - can be false
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        const logoutUrl = `https://us-east-2pdqpmnqnn.auth.us-east-2.amazoncognito.com/logout?client_id=7srref3p5poqme58bv5t562dnb&logout_uri=http://localhost:5173/`;
        res.redirect(logoutUrl);
    })
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

        const accessToken = tokenSet.access_token; 
        const idToken = tokenSet.id_token; 

        // storing accessToken in cookie - checks if user is valid
        res.cookie("access_token", accessToken, {
            httpOnly: false, // local dev - can be false - need to change when production
            secure: false, // local dev - can be false
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
        
        // storing idToken in cookie - has user info
        res.cookie("id_token", idToken, {
            httpOnly: false, // local dev - can be false - need to change when production
            secure: false, // local dev - can be false
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        // redirecting back to page - can update to the profile page / account page
        res.redirect('http://localhost:5173/');
    } catch (err) {
        console.error('Callback error: ', err);
        res.redirect('http://localhost:5173/');
    }
})

// jwt verification
const JWKS = createRemoteJWKSet(
    new URL(process.env.AWS_COGNITO_TOKEN_URL)
);

// checking JWT key to verify user 
async function authenticateJWT(req, res, next) {
    const accessToken = req.cookies.access_token;
    const idToken = req.cookies.id_token; 

    if (!accessToken || !idToken) {
        return res.status(401).json({ isAuthenticated: false });
    }

    try {
        
        const {payload: accessPayload} = await jwtVerify(accessToken, JWKS, {
            issuer: `https://cognito-idp.us-east-2.amazonaws.com/${process.env.AWS_COGNITO_POOLID}`
        })

        const {payload: idPayload} = await jwtVerify(idToken, JWKS, {
            issuer: `https://cognito-idp.us-east-2.amazonaws.com/${process.env.AWS_COGNITO_POOLID}`
        })

        req.user = idPayload;
        next(); 
    } catch (err) {
        return res.status(401).json({ isAuthenticated: false });
    }
}

// calling the authenticateJWT middleware
router.get('/get-authenticated', authenticateJWT, (req, res) => {
    res.json({
        isAuthenticated: true,
        user: req.user
    });
})

export { router, initializeClient }; 