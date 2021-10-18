const Event = require('../models/event-model');

createEvent = (req, res) => {
    const body = req.body;
    const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšśćžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a event',
        })
    }

    if (!(nameRegex.test(body.firstName))) {
        return res.status(400).json({
            success: false,
            error: 'wrong character on FirstName input'
        })
    }

    if (!(nameRegex.test(body.lastName))) {
        return res.status(400).json({
            success: false,
            error: 'wrong character on LastName input'
        })
    }

    const event = new Event(body);

    if (!event) {
        return res.status(400).json({ success: false, error: err })
    }

    event
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: event._id,
                message: 'Event created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Event not created!',
            })
        })
}

module.exports = { createEvent }