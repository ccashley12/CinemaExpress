import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

export const ProfileUpdate = ({user, updatedUser}) => {
    const token = localStorage.getItem("token");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday 
        }

        fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}`, 
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data),
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                console.log("Profile updated successfully!");
                return response.json();
            } else {
                alert ("Profile update FAILED!");
            }
        })
        .then ((data) => {
            updatedUser(data);
            setUsername(data.Username);
            setPassword(data.Password);
            setEmail(data.Email);
            setBirthday(data.Birthday);
            window.location.reload();
        })
        .catch((e) => {
            console.log(e);
        });
    };

    return (
        <>
           <Form onSubmit={handleSubmit}>
            <h2>Update Profile Information</h2>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                    />
                </Form.Group>
                <Form.Group className="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </Form.Group>
                <br></br>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </div>
            </Form>
        </>
    )
};

ProfileUpdate.propTypes = {
    user: PropTypes.object.isRequired,
    updatedUser: PropTypes.func.isRequired
};