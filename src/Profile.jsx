import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";

const Profile = ({
  userInfo,
  handleUpdateView,
  handleLogout,
  handleShowModal,
}) => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (userInfo) {
      if (typeof userInfo.address !== "undefined") {
        setAddress1(userInfo.address.address1);
        setAddress2(userInfo.address.address2);
        setCity(userInfo.address.city);
        setState(userInfo.address.state);
        setCountry(userInfo.address.country);
        setZip(userInfo.address.zip);
      }
    }
  }, []);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleUpdateView();
    const errorList = [];
    if (address1 === "") {
      errorList.push({
        errorType: "address1 validation",
        message: "Please enter address1",
      });
    }

    if (address2 === "") {
      errorList.push({
        errorType: "Address2 validation",
        message: "Please enter address2",
      });
    }
    if (city === "") {
      errorList.push({
        errorType: "city Validation",
        message: "Please enter city",
      });
    }
    if (state === "") {
      errorList.push({
        errorType: "state Validation",
        message: "Please enter state",
      });
    }
    if (country === "") {
      errorList.push({
        errorType: "country validation",
        message: "Please enter Country",
      });
    }
    if (zip === "") {
      errorList.push({
        errorType: "zip validation",
        message: "Please enter Zip",
      });
    }
    setError(errorList);
    if (errorList.length === 0) {
      const addressData = {
        address1,
        address2,
        city,
        state,
        country,
        zip,
      };
      userInfo.address = addressData;
      localStorage.setItem("user", JSON.stringify(userInfo));
      handleShowModal("Address is successfully saved!");
      console.log("Address is successfully saved", addressData);
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "address1":
        setAddress1(value);
        break;
      case "address2":
        setAddress2(value);
        break;
      case "city":
        setCity(value);
        break;
      case "state":
        setState(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "zip":
        setZip(value);
        break;
    }
  };
  const handleProfileReset = () => {
    setAddress1("");
    setAddress2("");
    setCity("");
    setState("");
    setCountry("");
    setZip("");
  };
  return (
    <Row id="myProfileInfoBox">
      <Col lg={3}>
        <Card className="mb-3">
          <Card.Body>
            <div className="d-flex-flex-column allign-items-center text-center">
              <img
                className="rounded-circle"
                src="../../mypic.jpg"
                alt=""
                width="150"
                height="150"
              />
              <div className="mt-3">
                <h4 id="userCardFullName">{userInfo.fullName}</h4>
                <p className="text-secondary mb-1" id="userCardExprience">
                  {userInfo.experience}
                </p>
                <button className="btn btn-outline-dark" onClick={handleLogout}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                </button>
                <h6 className="text-center text-uppercase font-weight-bolder mt-4">
                  Follow Me
                </h6>
              </div>
              <div className=" d-flex justify-content-around allign-items-center mt-3">
                <a
                  className="text-dark"
                  href="https://www.instagram.com/hemant017/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-instagram fa-2x" aria-hidden="true"></i>
                </a>
                <a
                  className="text-dark"
                  href="https://www.linkedin.com/in/hemant-kumar-055427217/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
                </a>
                <a
                  className="text-dark"
                  href="mailto:info.hemantkumar17@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-google fa-2x" aria-hidden="true"></i>
                </a>
                <a
                  className="text-dark"
                  href="https://github.com/devHemant"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-github fa-2x" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={7}>
        {/* User Information */}
        <Card className="mb-3">
          <Card.Body>
            <Row>
              <Col lg={3}>
                <h6 className="mb-0">Full Name</h6>
              </Col>
              <Col lg={9}>{userInfo.fullName}</Col>
            </Row>
            <hr />
            <Row>
              <Col lg={3}>
                <h6 className="mb-0">Email</h6>
              </Col>
              <Col lg={9}>{userInfo.email}</Col>
            </Row>
            <hr />
            <Row>
              <Col lg={3}>
                <h6 className="mb-0">Phone</h6>
              </Col>
              <Col lg={9}>{userInfo.phone}</Col>
            </Row>
          </Card.Body>
        </Card>
        {/* Address Form */}
        <Card>
          <Card.Body>
            <Row>
              <Col lg={12}>
                <h4 className="text-center text-uppercase font-weight-bolder">
                  Contact Details
                </h4>
              </Col>
            </Row>
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
            <hr />
            <Form id="addressForm">
              <Form.Group className="mb-3">
                <Form.Label>Address 1</Form.Label>
                <FormControl
                  type="text"
                  name="address1"
                  value={address1}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address 2</Form.Label>
                <FormControl
                  type="text"
                  name="address2"
                  value={address2}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="city">City</Form.Label>
                    <FormControl
                      type="text"
                      name="city"
                      value={city}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="state">State</Form.Label>
                    <FormControl
                      type="text"
                      name="state"
                      value={state}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      value={country}
                      id="country"
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <label htmlFor="zip">Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zip"
                      value={zip}
                      id="zip"
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="outline-success"
                onClick={(e) => handleProfileSubmit(e)}
              >
                Save
              </Button>{" "}
              <Button
                type="reset"
                variant="outline-danger"
                onClick={(e) => handleProfileReset(e)}
              >
                Reset
              </Button>{" "}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
