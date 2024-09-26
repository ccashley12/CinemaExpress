import React from "react";
import { ProfileInfo } from "./profile-info";
import { ProfileUpdate } from "./profile-update";
import { FavoriteMovies } from "./favorite-movies";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export const ProfileView = ({user, token, updatedUser, onLoggedOut, favMovies}) => {
    const ProfileDelete = () => {
        fetch(`https://cinema-express-948d60ca8d20.herokuapp.com/users/${user.Username}`, 
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                console.log("Account terminated successfully!");
                onLoggedOut();
            } else {
                alert("Failed to terminate account!");
            }
        })
    }

    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8}>
                        <Card>
                            <Card.Body>
                                <ProfileInfo name={user.Username} email={user.Email}/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Card>
                            <Card.Body>
                                <FavoriteMovies
                                    user={user}
                                    token={token}
                                    favMovies={favMovies}
                                />
                            </Card.Body>
                            <Card.Body>
                                <ProfileUpdate
                                    user={user}
                                    token={token}
                                    updatedUser={updatedUser}
                                />
                            </Card.Body>
                            <Card.Body>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        ProfileDelete();
                                    }}
                                >
                                    Delete Account
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
};