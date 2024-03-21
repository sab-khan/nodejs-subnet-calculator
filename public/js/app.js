function App() {
    const { useState } = React;
    const { Container, Row, Col, Form, InputGroup, Button } = ReactBootstrap;

    const [form, setForm] = useState({
        octet1: '',
        octet2: '',
        octet3: '',
        octet4: '',
        cidr: '',
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const isFormValid = validateForm(errors);

        if (!isFormValid) {
            fetch;
        } else {
            post('http://localhost:3000/calculate', JSON.stringify(form)).then(
                (data) => {
                    console.log(data); // JSON data parsed by `data.json()` call
                },
            );
        }

        //console.log(form);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isValid = validateField(value);

        setErrors({
            ...errors,
            [name]: !isValid,
        });

        setForm({
            ...form,
            [name]: value,
        });
    };

    const validateField = (input) => {
        const regex = /^[1-9]\d{0,2}$/;

        // validate a numeric value for the octet.
        // should be 1 to 3 chraraters and value less or equal to 255
        return regex.test(input) && parseInt(input) <= 255;
    };

    const validateForm = (errors) => {
        return !Object.values(errors).reduce(
            (acc, current) => acc && current,
            [],
        );
    };

    const post = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        });
        return response.json();
    };

    return (
        <Container>
            <Row className="mt-4">
                <Col>
                    <p>
                        Provide IP address and Subnet Mask in order to find your{' '}
                        <br />
                        range with Network, First Host, Last Host, Broadcast &{' '}
                        <br />
                        Next Subnet.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form className="form" onSubmit={handleSubmit}>
                        <InputGroup className="d-flex">
                            <Form.Control
                                name="octet1"
                                value={form.octet1}
                                style={{
                                    borderColor:
                                        errors.octet1 !== undefined &&
                                        errors.octet1
                                            ? 'red'
                                            : '',
                                }}
                                onChange={handleChange}
                            />
                            <span className="seperator">.</span>
                            <Form.Control
                                type="text"
                                name="octet2"
                                value={form.octet2}
                                style={{
                                    borderColor:
                                        errors.octet2 !== undefined &&
                                        errors.octet2
                                            ? 'red'
                                            : '',
                                }}
                                onChange={handleChange}
                            />
                            <span className="seperator">.</span>
                            <Form.Control
                                type="text"
                                name="octet3"
                                value={form.octet3}
                                style={{
                                    borderColor:
                                        errors.octet3 !== undefined &&
                                        errors.octet3
                                            ? 'red'
                                            : '',
                                }}
                                onChange={handleChange}
                            />
                            <span className="seperator">.</span>
                            <Form.Control
                                type="text"
                                name="octet4"
                                value={form.octet4}
                                style={{
                                    borderColor:
                                        errors.octet4 !== undefined &&
                                        errors.octet4
                                            ? 'red'
                                            : '',
                                }}
                                onChange={handleChange}
                            />
                            <span className="seperator">/</span>
                            <Form.Control
                                type="text"
                                name="cidr"
                                value={form.cidr}
                                style={{
                                    borderColor:
                                        errors.cidr !== undefined && errors.cidr
                                            ? 'red'
                                            : '',
                                }}
                                onChange={handleChange}
                            />
                            <Button type="submit">Calculate</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App tab="home" />);
