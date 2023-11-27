import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { Auth } from "aws-amplify";
import axios from "axios";

export default function MyAccount(props) {
  const deleteUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.deleteUser(user);
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const confirmAndDeleteUser = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      deleteTasks();
    }
  };

  const deleteTasks = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const url = apiUrl + `/tasks?uid=${props.uid}`;
    axios
      .delete(url)
      .then((response) => {
        console.log("Tasks deleted successfully");
        deleteUser();
      })
      .catch((error) => {
        console.error("Error deleting tasks:", error);
        window.alert("Error deleting tasks");
      });
  };
  return (
    <Container>
      <h1>My Account</h1>
      <p>
        This page allows you to delete your account. Deleting your account will
        delete all of your tasks and cannot be undone.
      </p>
      <Button onClick={confirmAndDeleteUser} variant="contained">
        Delete My Account
      </Button>
    </Container>
  );
}
