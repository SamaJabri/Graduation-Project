import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Avatar from "../components/Avatar";

import { saveToCloudinary } from "../assets/utility-functions";

const Profile = () => {
  const { id } = useParams();
  const uploadImage = useRef();

  const [userAvatar, setUserAvatar] = useState({ image: null, preview: "" });

  const currentUser = {
    id: 0,
    username: "Sama",
    firstName: "Sama",
    lastName: "Jabri",
    email: "sama.jabri@outlook.com",
    password: "Sama",
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];

    setUserAvatar({
      image: imageFile,
      preview: URL.createObjectURL(imageFile),
    });
  };

  const saveImage = () =>
    saveToCloudinary(userAvatar.image, "User Avatars", () => {});

  const calculateBMI = () => {};

  return (
    <div className="profile">
      <div className="profile__image">
        {userAvatar.image ? (
          <img src={userAvatar.preview} alt={userAvatar.image.name} />
        ) : (
          <Avatar place="profile" />
        )}

        <div className="profile__image-options">
          <button onClick={() => uploadImage.current.click()}>
            Upload Image
          </button>
          <input type="file" ref={uploadImage} onChange={handleImageUpload} />
          <button onClick={saveImage}>Save</button>
        </div>
      </div>
      <div className="profile__info">
        <h2>Personal Info</h2>
        <p>
          First Name: <span>{currentUser.firstName}</span>
        </p>
        <p>
          Last Name: <span>{currentUser.lastName}</span>
        </p>
        <p>
          Gender: <span>{currentUser.gender || "-"}</span>
        </p>
        <p>
          Age: <span>{currentUser.age || "-"}</span>
        </p>
        <p>
          Weight: <span>{currentUser.weight || "-"}</span>
        </p>
        <p>
          Height: <span>{currentUser.height || "-"}</span>
        </p>
        <p>
          BMI:{" "}
          <span>
            {currentUser.weight / Math.pow(currentUser.height, 2) || "-"}
          </span>
        </p>
      </div>
      {/*       <button className="profile__calculate-bmi" onClick={calculateBMI}>Calculate My BMI</button>
       */}{" "}
    </div>
  );
};

export default Profile;
