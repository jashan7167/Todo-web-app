import React from "react";
import { useParams, Link } from "react-router-dom";
function Welcome() {
  //use object destructuring always good practice
  const { username } = useParams();

  //dont use anchor tags in the react application due to that entire page refresh and we donot want that to happen instead use link
  console.log(username);
  return (
    <div>
      <h1>Welcome {username}</h1>
      <div className="todos">
        Manage Your todos
        <Link to="/todos"> Click Here</Link>
      </div>
    </div>
  );
}

export default Welcome;
