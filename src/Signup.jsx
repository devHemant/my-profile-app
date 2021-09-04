import React, { useState } from "react";
import {
  Row,
  Card,
  Form,
  InputGroup,
  FormControl,
  Col,
  Button,
  Alert,
} from "react-bootstrap";

const Signup = ({ userInfo, handleUpdateView, handleShowModal }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState("");

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const errorList = [];
    if (fullName === "") {
      errorList.push({
        errorType: "name Validation",
        message: "Please enter your full name",
      });
    }
    if (email === "") {
      errorList.push({
        errorType: "email Validation",
        message: "Please enter valid email address",
      });
    }
    if (password === "") {
      errorList.push({
        errorType: "password Validation",
        message: "Please enter password",
      });
    }
    if (confirmPassword === "") {
      errorList.push({
        errorType: "confirmPassword Validation",
        message: "Please enter confirm password",
      });
    }
    if (password !== confirmPassword) {
      errorList.push({
        errorType: "password and confirmPassword Validation",
        message: "Password and Confirm Password do not match",
      });
    }

    if (userInfo) {
      if (userInfo.email === email) {
        errorList.push({
          errorType: "email is exist",
          message:
            "Email Id already exist, Please try with different Email Id.",
        });
      }
    }
    setError(errorList);
    if (errorList.length === 0) {
      const signUpObject = {
        fullName,
        email,
        password,
        confirmPassword,
        phone,
        experience,
      };
      console.log("Form Submitted Successfully=>", signUpObject);
      localStorage.setItem("user", JSON.stringify(signUpObject));
      handleShowModal("Sign Up is successfully completed!");
      handleUpdateView();

      // setTimeout(() => {
      //   handleUpdateView();
      // }, 300);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "experience":
        setExperience(value);
        break;
    }
  };

  return (
    <Row id="signUpBox">
      <div className="d-flex justify-content-center allign-items-center"></div>
      <Card className="w-70">
        <Card.Body>
          <Form id="signUpForm">
            <Row>
              <Col lg={6} className="signupImgContainer">
                <img src="signup.png" className="img-fluid mt-5 b" />
              </Col>
              <Col lg={6}>
                <h4 className="text-center">Sign UP!</h4>
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
                <h6
                  className="text-danger text-sm"
                  id="signUPErrorMessage"
                ></h6>
                <Form.Group className="mb-3">
                  <InputGroup className="mb-3">
                    <FormControl
                      type="text"
                      name="fullName"
                      placeholder="Enter Your Name"
                      value={fullName}
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup className="mb-3">
                    <FormControl
                      type="text"
                      name="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup className="mb-3">
                    <FormControl
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Enter password"
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup className="mb-3">
                    <FormControl
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      placeholder="Enter confirm password"
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup className="mb-3">
                    <FormControl
                      type="number"
                      name="phone"
                      value={phone}
                      placeholder="Enter phone number"
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup className="mb-3">
                    <FormControl
                      type="text"
                      name="experience"
                      value={experience}
                      placeholder="Enter Work Experience"
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                </Form.Group>

                {/* <Form.Group className="mb-3">
                  <InputGroup className="mb-3">
                    <Form.Check
                      type="checkbox"
                      name="termNCondition"
                      value={termNCondition}
                      label="I agree all the statements in Terms of Service."
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                </Form.Group> */}

                <Row className="px-3">
                  <Button
                    variant="primary"
                    className="rounded-pill"
                    onClick={handleSignUpSubmit}
                  >
                    Register
                  </Button>
                </Row>

                {/* <hr />
                <div className="text-sm text-center">
                  Already on Site?{" "}
                  <a
                    href="#"
                    className="text-decoration-none"
                    // onClick="showSignIn()"
                  >
                    {" "}
                    Sign In
                  </a>
                </div> */}
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Signup;
