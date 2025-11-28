const { uploadCaption, createDatabase } = require("./sqlLogic");

const express = require("express");
const router = express.Router(); 

// uploads caption / post metadata to AWS MySQL 

router.post("/create-posts-table", async (req, res) => {
    try {
        await createDatabase(); 

        res.status(200).send({ success: true });
    } catch (err) {
        console.log(err); 
        res.status(500).send({ error: "Posts table not created" });
    }
})

router.post("/upload-caption", express.json(), async (req, res) => {
    try {
        const data = req.body
        console.log(data.caption); 

        res.status(200).send({ success: true });
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Caption not uploaded" })
    }
})

module.exports = router; 