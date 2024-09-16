import React from "react";

function ProfileInfo({ email, name }) {
    return (
        <>
            <h2>Account Information</h2>
            <p>Username: {name}</p>
            <p>Email: {email}</p>
        </>
    );
};

export default ProfileInfo