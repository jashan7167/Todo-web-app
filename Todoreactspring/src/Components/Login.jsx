import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { useAuth } from "../Authentication/Auth";
function Login() {
  // state variable are necessary for the forms as we need to change the value of the components in there
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  //get access to the auth context
  const authContext = useAuth();

  //handle onchange must be added so the change will be reflected
  function handleUsernameChange(event) {
    setUser(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  async function handleSubmit() {
    if (await authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="login-container">
      {showErrorMessage && (
        <div className="errorMessage">Authenticated Failed</div>
      )}

      <h1>Login</h1>
      <div className="input-container">
        <div className="username-input">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="password-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="button" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
