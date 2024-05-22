import React, { useEffect, useState } from "react";
import {
  createTodoApi,
  retrieveSpecificTodoForUser,
  updateTodo,
} from "../api/Todoapiservice";
import { useAuth } from "../Authentication/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import moment from "moment";
function Todoupdate() {
  const context = useAuth();
  const { id } = useParams();
  const username = context.username;
  const navigate = useNavigate();
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");

  function retrieveTodos() {
    if (id != -1) {
      retrieveSpecificTodoForUser(username, id)
        .then((response) => {
          console.log(response);
          setdescription(response.data.description);
          setdate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }
  useEffect(() => retrieveTodos(), [id]);

  function onSubmit(values) {
    console.log("Form submitted with values:", values);
    const todo = {
      id,
      username,
      description: values.description,
      targetDate: values.date,
      done: false,
    };
    console.log("Updating todo...");

    if (id == -1) {
      createTodoApi(username, todo)
        .then((response) => {
          console.log(response);
          navigate("/todos");
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        });
    } else {
      updateTodo(username, id, todo)
        .then((response) => {
          navigate("/todos");
          console.log(response);
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        });
    }
  }

  function validate(values) {
    let errors = {};

    if (values.description.length < 5) {
      errors.description = "Enter at least 5 characters";
    }
    if (values.date === null || values.date === "") {
      errors.date = "Enter a valid date";
    }
    return errors;
  }

  return (
    <>
      <h1>Enter todo details</h1>
      <div>
        <Formik
          initialValues={{
            description: description || "", // Provide default value if description is falsy
            date: date || "", // Provide default value if date is falsy
          }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(i) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert
                alert-warning"
              ></ErrorMessage>
              <ErrorMessage
                name="date"
                component="div"
                className="alert alert-warning"
              ></ErrorMessage>
              <fieldset className="form-group">
                <label htmlFor="">Description</label>
                <Field
                  type="text"
                  name="description"
                  className="form-control"
                ></Field>
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="">Target Date:</label>
                <Field
                  type="date"
                  id={id}
                  name="date"
                  className="form-control"
                ></Field>
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Todoupdate;
