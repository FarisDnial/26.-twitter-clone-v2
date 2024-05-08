import { useDispatch } from "react-redux";
import { deletePost } from "../features/posts/postSlice";
import { Button, Modal } from "react-bootstrap";

export default function DeleteModal({ show, handleClose, userId, postId }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePost({ userId, postId }));
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Deleting Tweets
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete this tweet?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}