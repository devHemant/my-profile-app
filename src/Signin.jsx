import React, { useState } from "react";
import {
  Row,
  Form,
  InputGroup,
  FormControl,
  Button,
  Card,
  Alert,
} from "react-bootstrap";

const Signin = ({ userInfo, handleUpdateView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleUpdateView();
    const errorList = [];
    if (email === "") {
      errorList.push({
        errorType: "Email Validation",
        message: "Please enter valid email address",
      });
    } else if (password === "") {
      errorList.push({
        errorType: "Password Validation",
        message: "Please enter valid password",
      });
    } else if (userInfo === null) {
      errorList.push({
        errorType: "Invalide Credential",
        message: "Invalide Credential, Please try again.",
      });
    } else if (userInfo.email !== email) {
      errorList.push({
        errorType: "Invalide Credential",
        message: "Invalide Credential, Please try again.",
      });
    } else if (userInfo.password !== password) {
      errorList.push({
        errorType: "Invalide Credential",
        message: "Invalide Credential, Please try again.",
      });
    }
    setError(errorList);
    if (errorList.length === 0) {
      const signInObject = {
        email,
        password,
      };
      console.log("Signin successfully=>", signInObject);
      localStorage.setItem("isLogin", JSON.stringify(true));
      handleUpdateView();
    } else {
      localStorage.setItem("isLogin", JSON.stringify(false));
      handleUpdateView();
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };
  return (
    <Row id="signInBox">
      <div className="d-flex justify-content-center allign-items-center">
        <Card className="w-50">
          <Card.Body>
            <h4 className="text-center">Sign In!</h4>
            {error.length > 0 && (
              <Alert variant="danger">
                <Alert.Heading>Oops! You got an error!</Alert.Heading>
                <ul>
                  {error.map((err) => (
                    <li>{err.message}</li>
                  ))}
                </ul>
              </Alert>
            )}
            <h6 className="text-danger text-sm" id="signInErrorMessage"></h6>
            <Form id="signInForm">
              <Form.Group className="mb-3">
                <InputGroup className="mb-3">
                  <FormControl
                    type="Email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => handleChange(e)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <InputGroup className="mb-3">
                  <FormControl
                    type="Password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                  />
                </InputGroup>
              </Form.Group>
              <Row className="px-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-pill"
                  onClick={(e) => handleSignInSubmit(e)}
                >
                  Sign In
                </Button>
              </Row>

              {/* <hr />
              <div className="text-sm text-center">
                New on Site?{" "}
                <a
                  href="#"
                  className="text-decoration-none d-inline-block"
                  // onclick="showSignUp()"
                >
                  {" "}
                  Sign In
                </a>
              </div> */}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Row>
  );
};

export default Signin;
