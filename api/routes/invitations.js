var express = require("express");
const mailService = require('../src/service/mailService');
var router = express.Router();
const Invitation = require('../src/model/invitation');
const { v4: uuidv4 } = require('uuid');


// This router will fetch all the invitations
router.get("/", async (req, res) => {
    try {
        const invitations = await Invitation.find();
        res.json(invitations);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Sorry something went wrong while fetching invitations" });
    }
});

// This router will return an invitation that the user will have to accept or no and it will have a uuid param generated randomly in invitation submition.
router.get("/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    const invitation = await Invitation.find({ uuid: { $in: [uuid] } });
    res.json(invitation[0]);
});


// This router will submit a list of invitations
router.post("/", async (req, res) => {

    try {
        const invites = req.body?.map(element => {
            if (!element.email & !element.mobile) {
                return res.status(400).send({ message: "You should provide 'email' or 'mobile'" });
            }
            return {
                uuid: uuidv4(),
                lastName: element?.lastName,
                email: element?.email,
                mobile: element?.mobile
            }
        });

        await Invitation.bulkWrite(
            invites.map((invite) =>
            ({
                updateOne: {
                    filter: { email: invite.email, mobile: invite.mobile },
                    update: invite,
                    upsert: true
                }
            })
            )
        )
        res.status(200).json({ message: "Invitations saved successfully" });

    } catch (error) {
        console.error(error)
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            res.status(400).send(errors);
        }
        res.status(500).json({ message: "Something went wrong" });
    }
});

// This router will send emails - input list of emails
router.post("/email/submit", async (req, res) => {
    try {
        let invitations = await Invitation.find().where('_id').in(req.body).exec();

        Promise.all(invitations.map(async (invite) => {
            await mailService.sendEmail(invite).then(async (result) => {
                if (!result) return;
                await Invitation.findByIdAndUpdate({ '_id': invite._id }, { emailSent: true }, { new: true })
            });
        })).then(() => {
            res.status(200).json({ message: "Invitations saved successfully" });
        });


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Something went wrong" });
    }
});


// This router will update an invitation - register
router.put("/:id", async (req, res) => {

    await Invitation.findByIdAndUpdate({ '_id': req.params?.id }, req.body, { new: true },

        (err, invitation) => {
            if (!err) {
                res.json(invitation);
            }
        });
    res.status(500).json({ message: "Something went wrong" })
});

// This router will delete mutiple invitations
router.delete("/", async (req, res) => {
    await Invitation.deleteMany({ '_id': { $in: req.body } },
        (err) => {
            if (!err) {
                res.json({ message: "Successfully deleted" });
            } else {
                res.status(500).json({ message: "Something went wrong" });
            }
        }).clone().catch(function (err) { console.log(err) });;
});

router.put("/register/:id", async (req, res) => {

    await Invitation.findByIdAndUpdate({ '_id': req.params?.id }, { registered: req.body?.registered }, { new: true },
        (err, invitation) => {
            if (!err) {
                res.json(invitation);
            } else {
                res.status(500).json({ message: "Something went wrong" })
            }
        }).clone().catch(function (err) { console.log(err) });
});


module.exports = router;