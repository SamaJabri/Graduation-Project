import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Avatar from "../components/Avatar";

import { saveToCloudinary } from "../assets/utility-functions";
import Icon from "../components/Icon";

const Profile = () => {
  const { id } = useParams();
  const uploadImage = useRef();

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [userAvatar, setUserAvatar] = useState({ image: null, preview: "" });

  const currentUser = {
    id: 0,
    username: "Sama",
    firstName: "Sama",
    lastName: "Jabri",
    email: "sama.jabri@outlook.com",
    password: "Sama",
  };

  const toggleEdit = (e) => setIsBeingEdited((isBeingEdited) => !isBeingEdited);

  // User Image upload --> Preview it
  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];

    setUserAvatar({
      image: imageFile,
      preview: URL.createObjectURL(imageFile),
    });
  };

  // User Image save --> Upload to cloudinary
  const saveImage = () =>
    saveToCloudinary(userAvatar.image, "User Avatars", () => {});

  // Handle the update of data --> Update store
  const handleUserInfoUpdate = (e) => {
    e.preventDefault();
  };

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
        <div className="profile__info-edit">
          <h2>Personal Info</h2>

          {isBeingEdited ? (
            <Icon iconName="AiOutlineClose" onClick={toggleEdit} />
          ) : (
            <Icon iconName="AiOutlineEdit" onClick={toggleEdit} />
          )}
        </div>

        {isBeingEdited ? (
          <form className="profile__edit" onSubmit={handleUserInfoUpdate}>
            <label for="firstName">First Name</label>{" "}
            <input
              type="text"
              name="firstName"
              id="firstName"
              defaultValue={currentUser.firstName}
            />
            <label for="lastName">Last Name</label>{" "}
            <input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={currentUser.lastName}
            />
            <label for="gender">Gender</label>{" "}
            <select id="gender" name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label for="age">Age</label>{" "}
            <input
              type="number"
              name="age"
              id="age"
              min="0"
              max="200"
              defaultValue={currentUser.age}
            />
            <label for="weight">Weight</label>{" "}
            <input
              type="number"
              name="weight"
              id="weight"
              defaultValue={currentUser.weight}
            />
            <label for="height">Height</label>{" "}
            <input
              type="number"
              name="height"
              id="height"
              defaultValue={currentUser.height}
            />
            <input type="submit" value="Save" />
          </form>
        ) : (
          <>
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
          </>
        )}
      </div>
      {/*       <button className="profile__calculate-bmi" onClick={calculateBMI}>Calculate My BMI</button>
       */}{" "}
    </div>
  );
};

export default Profile;
