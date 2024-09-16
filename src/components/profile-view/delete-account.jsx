import React, { useState } from "react";
import {Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DeleteAccountButton = ({ username, token, onLoggedOut }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("token");

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${username}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            onLoggedOut();
            navigate("/login");
        } catch (error) {
            console.error("Error terminating account:", error);
        }
    };

    return (
        <>
            <Button onClick={() => setShowModal(true)} variant="danger">
                Delete Account
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Termination of Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you still wanting to delete your account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={() => {
                        handleDeleteClick();
                        setShowModal(false);
                    }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteAccountButton;