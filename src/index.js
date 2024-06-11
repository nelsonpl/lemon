const express = require('express');
const bodyParser = require('body-parser');
const { checkEligibility } = require('./services/eligibility');
const { validateInput } = require('./services/validateInput');

const app = express();
app.use(bodyParser.json());

app.post('/check-eligibility', (req, res) => {
    const input = req.body;
    const validationError = validateInput(input);

    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const result = checkEligibility(input);
    res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
