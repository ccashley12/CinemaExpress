import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { ProfileInfo } from "./profile-info";
import { ProfileUpdate } from "./profile-update";

export const ProfileView = ({user, token, updatedUser, onLoggedOut}) => {
    const ProfileDelete = () => {
        fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            },   
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                console.log("Account deleted successfully!");
            } else {
                alert("Failed to delete account!");
            }
        })
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <Card>
                        <Card.Header>
                            <ProfileInfo name={user.Username} email={user.Email}/>
                        </Card.Header>
                    </Card>
                </Col>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <ProfileUpdate
                                user={user}
                                token={token}
                                updatedUser={updatedUser}
                            />
                        </Card.Body>
                        <Card.Body>
                            <Button variant="danger" onClick={() => {ProfileDelete();}}>
                                Delete account
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}