import React, { useState } from "react";
import { Link } from "react-router-dom";

const Avatar = (props) => {
  const currentUser = {
    id: 0,
    username: "Sama",
    firstName: "Sama",
    lastName: "Jabri",
    email: "sama.jabri@outlook.com",
    password: "Sama",
    img_src:
      "https://res.cloudinary.com/df9xmfkp1/image/upload/v1676460953/User%20Avatars/ymhqy9yqjdg4ukcsciz0.png",
  };

  const [userSettings, setUserSettings] = useState(false);

  const toggleUserSettings = () =>
    setUserSettings((userSettings) => !userSettings);

  return (
    <div className={`${props.place}__user-avatar`} onClick={toggleUserSettings}>
      {currentUser.img_src ? (
        <img src={currentUser.img_src} alt={currentUser.username} />
      ) : (
        <p>{currentUser.firstName[0] + currentUser.lastName[0]}</p>
      )}

      {userSettings && (
        <div className="user-setting">
          <Link to={`/profile/${currentUser.id}`}>
            <button>My Profile</button>
          </Link>

          <Link>
            <button>Settings</button>
          </Link>

          <Link to="/login">
            <button>Log Out</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Avatar;
