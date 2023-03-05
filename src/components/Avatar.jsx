import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePatientsStore from "../store/patient/patients-store";

const Avatar = (props) => {
  const navigate = useNavigate();

  /*   const currentUser = {
    id: 0,
    username: "Sama",
    firstName: "Sama",
    lastName: "Jabri",
    email: "sama.jabri@outlook.com",
    password: "Sama",
    img_src:
      "https://res.cloudinary.com/df9xmfkp1/image/upload/v1676460953/User%20Avatars/ymhqy9yqjdg4ukcsciz0.png",
  }; */

  const [userSettings, setUserSettings] = useState(false);

  const currentPatient = usePatientsStore((state) => state.currentPatient);
  const logOutPatient = usePatientsStore((state) => state.logOutPatient);

  const toggleUserSettings = () =>
    setUserSettings((userSettings) => !userSettings);

  const handleLogOut = (e) => {
    e.preventDefault();

    logOutPatient(currentPatient.id);

    navigate("/login");
  };

  return (
    <div className={`${props.place}__user-avatar`} onClick={toggleUserSettings}>
      {currentPatient.img_src ? (
        <img src={currentPatient.img_src} alt={currentPatient.username} />
      ) : (
        <p>{currentPatient.name[0] + currentPatient.surname[0]}</p>
      )}

      {userSettings && (
        <div className="user-setting">
          <Link to={`/profile/${currentPatient.id}`}>
            <button>My Profile</button>
          </Link>

          <Link to={`/profile/${currentPatient.id}`}>
            <button>Settings</button>
          </Link>

          <Link onClick={handleLogOut}>
            <button>Log Out</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Avatar;
