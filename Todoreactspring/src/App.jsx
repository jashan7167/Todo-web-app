import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Components/Login";
import Welcome from "./Components/Welcome";
import Error from "./Components/Error";
import Listtodos from "./Components/Listtodos";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Logout from "./Components/Logout";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Auth, { useAuth } from "./Authentication/Auth";
import Todoupdate from "./Components/Todoupdate";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

function App() {
  //so out page will be the combination of three components header component a footer the Router component in which the route will be selected on the base of the Router
  return (
    <>
      <Auth>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <Welcome></Welcome>
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <Listtodos></Listtodos>
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <Logout></Logout>
                </AuthenticatedRoute>
              }
            ></Route>
            <Route
              path="/update/:id"
              element={
                <AuthenticatedRoute>
                  <Todoupdate></Todoupdate>
                </AuthenticatedRoute>
              }
            ></Route>
            <Route path="*" element={<Error></Error>}></Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </Auth>
    </>
  );
}

export default App;
