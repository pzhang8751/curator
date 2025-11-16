const { uploadPhoto } = require("./s3Logic");

const express = require("express");
const router = express.Router(); 

// uploads png image to s3 bucket
router.post("/photo", express.raw({ type: "image/png", limit: "10mb" }), async (req, res) => {
    try {
        const id = await uploadPhoto(req.body);

        res.status(200).send({ success: true, id: id });
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Photo not uploaded" })
    }
})

module.exports = router; 