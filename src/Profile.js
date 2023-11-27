import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Container, TextField, Button } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
      setNewName(currentUser.attributes.name);
    } catch (error) {
      console.error("Error loading the user:", error);
    }
  };

  const handleNameChange = async () => {
    try {
      await Auth.updateUserAttributes(user, {
        name: newName,
      });
      alert("Name updated successfully");
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      await Auth.changePassword(user, oldPassword, newPassword);
      alert("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <Container>
      <h1>Profile Page</h1>
      <TextField
        label="Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Button onClick={handleNameChange}>Update Name</Button>
      <br />
      <hr />
      <TextField
        label="Old Password"
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button onClick={handlePasswordChange}>Change Password</Button>
    </Container>
  );
};

export default Profile;
