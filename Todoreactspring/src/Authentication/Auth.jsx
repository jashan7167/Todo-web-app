import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import {
  executeBasicAuthenticationService,
  executeJwtAuthenticationService,
} from "../api/Todoapiservice";
import { apiClient } from "../api/apiclient";

//create a context
export const AuthContext = createContext();

//creating a hook so that other components can use directly
export const useAuth = () => useContext(AuthContext);

//share the create context with other components

function Auth({ children }) {
  // put some state in the context

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  //as we are passing multiple values into the context it is better to create an object and then send it

  // function login(username, password) {
  //   if (username === "jashan" && password === "jattojatt") {
  //     setUsername(username)
  //     setAuthenticated(true);
  //     return true;
  //   } else {
  //     setAuthenticated(false);
  //     return false;
  //   }
  // }

  // async function login(username, password) {
  //   const baToken = "Basic " + window.btoa(username + ":" + password);

  //   try {
  //     const response = await executeBasicAuthenticationService(baToken);

  //     if (response.status == 200) {
  //       setAuthenticated(true);
  //       setUsername(username);
  //       setToken(baToken);

  //       apiClient.interceptors.request.use((config) => {
  //         config.headers.Authorization = baToken;
  //         return config;
  //       });

  //       return true;
  //     } else {
  //       setAuthenticated(false);
  //       setUsername(null);
  //       setToken(null);
  //       return false;
  //     }
  //   } catch (error) {
  //     setAuthenticated(false);
  //     setUsername(null);
  //     setToken(null);
  //     return false;
  //   }
  // }

  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );

      if (response.status == 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
        return false;
      }
    } catch (error) {
      setAuthenticated(false);
      setUsername(null);
      setToken(null);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setToken(null);
  }
  const shareValue = {
    username,
    isAuthenticated,
    setAuthenticated,
    login,
    logout,
    token,
  };

  return (
    <AuthContext.Provider value={shareValue}>{children}</AuthContext.Provider>
  );
}

export default Auth;
