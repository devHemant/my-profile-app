import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import ModalComponent from "./Modal";

const App = () => {
  const [isLogin, setIsLogin] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [updateView, setUpdateView] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem("isLogin")));
    setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, [updateView]);

  const handleUpdateView = () => {
    setUpdateView(!updateView);
  };
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    handleShowModal("Logout Successfully!");
    handleUpdateView();
  };

  return (
    <div className="container mt-5">
      {isLogin && userInfo ? (
        <Profile
          userInfo={userInfo}
          handleUpdateView={handleUpdateView}
          handleLogout={handleLogout}
          handleShowModal={handleShowModal}
        />
      ) : userInfo === null ? (
        <Signup
          userInfo={userInfo}
          handleUpdateView={handleUpdateView}
          handleShowModal={handleShowModal}
        />
      ) : (
        <Signin
          userInfo={userInfo}
          handleUpdateView={handleUpdateView}
          handleShowModal={handleShowModal}
        />
      )}
      {showModal && (
        <ModalComponent
          show={showModal}
          handleClose={handleCloseModal}
          message={modalMessage}
        />
      )}
    </div>
  );
};

export default App;
