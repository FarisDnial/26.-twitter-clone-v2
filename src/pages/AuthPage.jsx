import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useContext, useState } from "react";
import { Button, Col, Form, Image, Modal, Row, Alert } from "react-bootstrap";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1";
    // values: null (no modal show), "login", "signup"
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("signup");
    const handleShowLogin = () => setModalShow("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [messageError, setMessageError] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);


    if (currentUser) navigate("/profile");

    const handleSignUp = async (e) => {
        e.preventDefault();
        // Check password requirements
        if (password.length < 8) {
            setMessageError('Password must be at least 8 characters long.');
        } else if (!/[a-z]/.test(password)) {
            setMessageError('Password must contain at least one lowercase letter.');
        } else if (!/[A-Z]/.test(password)) {
            setMessageError('Password must contain at least one uppercase letter.');
        } else if (!/\d/.test(password)) {
            setMessageError('Password must contain at least one digit.');
        } else if (!/[@$!%*?&]/.test(password)) {
            setMessageError('Password must contain at least one special character.');
        } else {
            setMessageError('');
            try {
                const res = await createUserWithEmailAndPassword(
                    auth,
                    username,
                    password
                );
                console.log(res.user);
            } catch (error) {
                console.error(error);
            }
        }

    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password);
        } catch (error) {
            setMessageError('Invalid username or password. Please try again.');
            console.error(error); // Log other errors to the console
        }
    };

    const handlePasswordChange = () => {
        setMessageError('');
    };

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
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
                <i
                    className="bi bi-twitter"
                    style={{ fontSize: 50, color: "dodgerblue" }}
                ></i>

                <p className="mt-5" style={{ fontSize: 64 }}>
                    Happening Now
                </p>
                <h2 className="my-5" style={{ fontSize: 31 }}>
                    Join Twitter today.
                </h2>
                <Col sm={5} className="d-grid gap-2">
                    <Button
                        className="rounded-pill"
                        variant="outline-dark"
                        onClick={handleGoogleLogin}
                    >
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-facebook"></i> Sign up with Facebook
                    </Button>
                    <p style={{ textAlign: "center" }} className="my-2">or</p>
                    <Button className="rounded-pill" onClick={handleShowSignUp}>
                        Create an account
                    </Button>
                    <p style={{ fontSize: "12px" }}> By signing up, you agree to the terms of Service and Privacy Policy including Cookie Use.</p>
                    <p className="mt-5 mb-2" style={{ fontWeight: "bold" }}>
                        Already have an account?
                    </p>
                    <Button
                        className="rounded-pill"
                        variant="outline-primary"
                        onClick={handleShowLogin}
                    >
                        Sign in
                    </Button>
                </Col>
                <Modal
                    show={modalShow !== null}
                    onHide={() => { handleClose(); handlePasswordChange(); }}
                    animation={false}
                    size="lg"
                    centered
                >
                    <Modal.Body>
                        <h2 className="my-4 px-5" style={{ fontWeight: "bold" }}>
                            {modalShow === "signup"
                                ? "Create your account"
                                : "Log in to your account"}
                        </h2>

                        <Form
                            className="d-grid gap-2 px-5"
                            onSubmit={modalShow === "signup" ? handleSignUp : handleLogin}
                        >
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Control
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="email"
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        handlePasswordChange(e);
                                    }}
                                    type="password"
                                    placeholder="Password"

                                />
                            </Form.Group>
                            {messageError && <Alert className="my-3 " variant="danger">{messageError}</Alert>}
                            {modalShow === "signup" ? <p style={{ fontSize: "12px" }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                            </p> : <p style={{ fontSize: "12px" }}>
                                By logging in, you acknowledge and accept our Terms of Service and Privacy Policy, which includes the use of cookies. SigmaTweets may utilize your contact details, such as email address and phone number, as outlined in our Privacy Policy, for maintaining account security and personalizing our services, including advertisements. Discover more about our policies. Your email or phone number may be used by others to find you, unless you opt out.</p>}
                            <Button className="rounded-pill my-3" type="submit">
                                {modalShow === "signup" ? "Sign up" : "Log in"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

            </Col>
        </Row>
    );
}
