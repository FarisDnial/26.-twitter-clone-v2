import { Button, Modal } from "react-bootstrap";


export default function LogOutModal({ show, handleClose, handleLogout }) {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sign Out
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to Logout?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </Modal.Footer>
        </Modal>
    );
}