var express = require("express");
var router = express.Router();
const Invitation = require('../src/model/invitation');
const { v4: uuidv4 } = require('uuid');



// This router will fetch all the invitations
router.get("/", async (req, res) => {
    try {
        const invitations = await Invitation.find();
        res.json(invitations);
    } catch (error) {
        res.status(500).json({ message: "Sorry something went wrong while fetching invitations" });
    }
});

// This router will return an invitation that the user will have to accept or no and it will have a uuid param generated randomly in invitation submition.
router.get("/:uuid", (req, res) => {
    const uuid = req.params.uuid;
    res.send("API is working properly with uuid : " + uuid);
});


// This router will submit a list of invitations - send emails/sms
router.post("/", async (req, res) => {

    try {
        await Promise.all(req.body?.map(async (element) => {
            const invitation = new Invitation({
                uuid: uuidv4(),
                lastName: element?.lastName,
                email: element?.email,
                mobile: element?.mobile
            });

            await invitation.save(invitation);
            
            //TODO send email
            //TODO send sms

        }));
        res.status(200).json({ message: "Invitations sent successfully" });
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).send(errors);
        }
        res.status(500).send("Something went wrong");
    }
});

// This router will update an invitation

// This router will delete an invitation


module.exports = router;