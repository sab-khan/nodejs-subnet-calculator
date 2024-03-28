const express = require('express');
const Netmask = require('netmask').Netmask;
const app = express();
const port = 3000;

const validateOctet = require('./validation');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.post('/api/calculate', (req, res, next) => {
    const { body } = req;

    let errors = [];
    for (const [key, value] of Object.entries(body)) {
        if (!validateOctet(value)) {
            errors.push(`${key} field is not valid`);
        }
    }

    if (errors.length > 0) {
        return res.status(403).json({
            errors: errors,
            data: {},
        });
    }

    const { octet1, octet2, octet3, octet4, cidr } = body;
    const ipv4 = `${[octet1, octet2, octet3, octet4].join('.')}/${cidr}`;

    try {
        let block = new Netmask(ipv4);
        const { base, mask, broadcast, size, first, last } = block;

        return res.status(200).json({
            errors: [],
            data: {
                base: base,
                mask: mask,
                broadcast: broadcast,
                size: size,
                first: first,
                last: last,
            },
        });
    } catch (e) {
        return next(e);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
