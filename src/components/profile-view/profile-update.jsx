import React from "react";
import { Button, Form } from "react-bootstrap";

function ProfileUpdate({user, handleChange, handleSaveClick, handleEditClick, isEditing, editedUser}) {

    return (
        <>
            <div>
            <h2>Update Profile Information</h2>
            </div>
                <Form.Group className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={isEditing ? editedUser.username : user.username}
                        onChange={handleChange}
                        required
                        minLength="3"
                        disabled={!isEditing}

                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="text"
                        value={isEditing ? editedUser.password : user.password}
                        onChange={handleChange}
                        required
                        minLength="8"
                        disabled={!isEditing}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={isEditing ? editedUser.email : user.email}
                        onChange={handleChange}
                        required
                        disabled={!isEditing}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={isEditing ? editedUser.birthday : user.birthday}
                        onChange={handleChange}
                        required
                        disabled={!isEditing}
                    />
                </Form.Group>
                <br></br>
                <div className="d-grid gap-2">
                    <Button onClick={isEditing ? handleSaveClick : handleEditClick}>
                        {isEditing ? "Save" : "Edit Profile"}
                    </Button>
                </div>
        </>
    );
}

export default ProfileUpdate;