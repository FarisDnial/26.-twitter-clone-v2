import { useEffect, useState } from "react";
import { Col, Row, Image, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";



export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1";
    const url = "https://291de487-3651-4870-9973-802f897f5c64-00-20dxe7ykhrclh.kirk.replit.dev/";

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // possible values: null (no modal shows) , "Login", "Signup"
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate("/profile")
        }
    }, [authToken, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}signup`, { username, password });// if at the end of the url already have "/" then dont need to put it after ${url}
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}login`, { username, password });
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token); // save token to localStorage
                console.log("Login was succesful, token saved")
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => setModalShow(null);

    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6} className="p-4">
                <i className="bi bi-twitter" style={{ fontSize: 50, color: "dodgerblue" }}></i>

                <p className="mt-5" style={{ fontSize: 64, fontWeight: "bold" }}>Happening Now</p>
                <h2 className="my-5" style={{ fontSize: 31, fontWeight: "bold" }}>Join Twitter Today.</h2>

                <Col sm={4} className="d-grip gap-2">
                    <Row>
                        <Button className="rounded-pill my-3" variant="outline-dark">
                            <i className="bi bi-google"></i> Sign up with Google
                        </Button>
                        <Button className="rounded-pill mb-2" variant="outline-dark">
                            <i className="bi bi-apple"></i> Sign up with Apple
                        </Button>
                        <p style={{ textAlign: "center" }}>or</p>

                        <Button className="rounded-pill" onClick={handleShowSignUp}>
                            Create an account
                        </Button>

                        <p className="my-2" style={{ fontSize: "12px" }}>
                            By signing up, you agree to the terms of Service and Privacy Policy including Cookie Use.
                        </p>

                        <p className="mt-5" style={{ fontWeight: "bold" }}>
                            Already have an account?
                        </p>
                        <Button className="rounded-pill" variant="outline-primary" onClick={handleShowLogin}>
                            Sign in
                        </Button>
                    </Row>
                    <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered size="lg">
                        <Modal.Body >
                            <h2 className="my-4 px-5" style={{ fontWeight: "bold" }}>
                                {modalShow === "SignUp"
                                    ? "Create your account"
                                    : "Log in to your account"}
                            </h2>

                            <Form className="d-grip gap-2 px-5"
                                onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
                            >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                {modalShow === "SignUp" ? <p style={{ fontSize: "12px" }}>
                                    By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                                </p> : <p style={{ fontSize: "12px" }}>
                                    By logging in, you acknowledge and accept our Terms of Service and Privacy Policy, which includes the use of cookies. SigmaTweets may utilize your contact details, such as email address and phone number, as outlined in our Privacy Policy, for maintaining account security and personalizing our services, including advertisements. Discover more about our policies. Your email or phone number may be used by others to find you, unless you opt out.                                </p>}

                                <Button className="rounded-pill my-3" type="submit">
                                    {modalShow === "SignUp" ? "Sign up" : "Login"}
                                </Button>
                            </Form>

                        </Modal.Body>
                    </Modal>
                </Col>
            </Col>
        </Row>
    )
}