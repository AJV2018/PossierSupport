import { createSupportTicket } from '../../services/requests';

const nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    tls: true,
    auth: {
        user: "apikey",
        pass: "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"
    }
});
export default function createTicket(req, res) {
    try {
        const {
            email,
            phone,
            subject,
            currentCat,
            description,
            priority
        } = req.body || {}
        if (email && phone && currentCat && description && priority) {
            const axios = require('axios').default
            axios.post(
                'https://possier.atlassian.net/rest/api/2/issue/',
                {
                    "fields": {
                        "project":
                        {
                            "key": "ES"
                        },
                        "summary": `${phone}:${currentCat?.name}`,
                        "description": `${email}\n${phone}\n\n${priority?.name}\n\n${description}`,
                        "issuetype": {
                            "name": "Bug"
                        }
                    }
                },
                {
                    auth: {
                        username: 'mohith@possier.com',
                        password: 'sx2JTUMhTgsuhIl1A6IN2A64'
                    }
                }
            ).then(response => {
                transporter.sendMail({
                    from: "info@possier.com", // sender address
                    to: ['amaljvarghese@gmail.com'], // list of receivers
                    subject: `SUPPORT ${phone}:${currentCat?.name}`, // Subject line
                    text: "", // plain text body
                    html: getHtml({
                        email,
                        phone,
                        currentCat: currentCat?.name,
                        subject: '',
                        description: description,
                        priority: priority?.name
                    }) // html body
                }, function (err, info) {
                    createSupportTicket({
                        category: currentCat.name,
                        feedback: '',
                        description: description,
                        status: 0,
                        platform: 'all',
                        store: '',
                        customerDetails: {
                            mobile: phone,
                            email: email
                        },
                        ticketId: response.data?.id || '',
                        priority: priority?.name
                    })
                    res.status(response.data?.id ? 200 : 400).json({
                        info: info,
                        err: err,
                        ticketId: response.data?.id
                    })
                });
            }).catch(err => res.status(400).json(err.response?.data || {}))
        } else {
            res.status(400).json({ message: 'Invalid Parameters' })
        }
    } catch (error) {
        res.status(400).json(err.response?.data || {})
    }
}
const customerHtml = (ticketId) => (
    `
    <div>
    <p>
        Thank you for reaching Possier!
        We have received your request and a ticket has been created (Ticket Number ${ticketId}).
    </p>
    <p>
        Our Service Associate will review the request and connect with you in the next 3-5 hours.,
    </p>

    <p>
        Due to heavy traffic on our website, it may take a little longer than usual for us to reach you.
        We regret the inconvenience and appreciate your understanding.
    </p>

    Thank you!

    Sincerely,
    <h3>Possier Service Team</h3>
</div>`
)
const getHtml = ({
    email,
    phone,
    subject,
    currentCat,
    description,
    priority
}) => (
    `
        <h1>Support Ticket Initiated</h1>
        <h3>Email : ${email}</h3>
        <h3>Phone : ${phone}</h3>
        <h3>Priority : ${priority?.name}</h3>
        <h3>Category : ${currentCat.name}</h3>
        <h3>Description : ${description}</h3>
        `
)
