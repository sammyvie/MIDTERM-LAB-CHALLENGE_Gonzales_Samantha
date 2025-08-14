const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
});

// Handle POST request
app.post('/submit-form', (req, res) => {
    const { fullname, email, gender, country, comments } = req.body;
    const skills = Array.isArray(req.body.skills) ? req.body.skills.join(', ') : req.body.skills || 'None';

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Form Submitted</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div class="confirmation-container">
                <h1>Form submitted successfully!</h1>
                <p><strong>Hello,</strong> ${fullname}!</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Gender:</strong> ${gender}</p>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>Skills:</strong> ${skills}</p>
                <p><strong>Comments:</strong> ${comments}</p>
                <a href="/" class="back-btn">Go Back</a>
            </div>
        </body>
        </html>
    `);
});

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});
