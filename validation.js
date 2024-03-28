const validateOctet = (input) => {
    const regex = /^(0|[1-9][0-9]{0,2})$/;

    // validate a numeric value for the octet.
    // should be 1 to 3 chraraters and value less or equal to 255
    return regex.test(input) && parseInt(input) <= 255;
};

module.exports = validateOctet;
