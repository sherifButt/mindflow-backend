const nodemailer = require('nodemailer');

/**
 * Sends an email using nodemailer and Gmail.
 * @param {string} recipient - The email recipient.
 * @param {string} subject - The email subject.
 * @param {string} body - The email body.
 * @returns {Promise<string>} - A promise that resolves to the email ID.
 */
async function sendEmail(recipient, subject, body) {
    // Validate recipient
    if (!recipient) {
        throw new Error('Recipient is required.');
    }

    // Validate subject
    if (!subject) {
        throw new Error('Subject is required.');
    }

    // Validate body
    if (!body) {
        throw new Error('Body is required.');
    }

    try {  // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Create email options
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: recipient,
            subject,
            text: body,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // Return the email ID
        return info.messageId;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = sendEmail;