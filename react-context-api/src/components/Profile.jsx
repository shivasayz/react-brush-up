import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <div>Please login to view profile</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Password: {user.password}</p>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}

export default Profile;
