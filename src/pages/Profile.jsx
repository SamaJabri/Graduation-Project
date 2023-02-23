import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Avatar from "../components/Avatar";

import { saveToCloudinary } from "../assets/utility-functions";
import Icon from "../components/Icon";
import usePatientsStore from "../store/patient/patients-store";

const Profile = () => {
  const { id } = useParams();
  const uploadImage = useRef();

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [userAvatar, setUserAvatar] = useState({ image: null, preview: "" });

  const currentPatient = usePatientsStore((state) => state.currentPatient);

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
            <label htmlFor="firstName">First Name</label>{" "}
            <input
              type="text"
              name="firstName"
              id="firstName"
              defaultValue={currentPatient.name}
            />
            <label htmlFor="lastName">Last Name</label>{" "}
            <input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={currentPatient.surname}
            />
            <label htmlFor="gender">Gender</label>{" "}
            <select id="gender" name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label htmlFor="age">Age</label>{" "}
            <input
              type="number"
              name="age"
              id="age"
              min="0"
              max="200"
              defaultValue={currentPatient.age}
            />
            <label htmlFor="weight">Weight</label>{" "}
            <input
              type="number"
              name="weight"
              id="weight"
              defaultValue={currentPatient.weight}
            />
            <label htmlFor="height">Height</label>{" "}
            <input
              type="number"
              name="height"
              id="height"
              defaultValue={currentPatient.height}
            />
            <input type="submit" value="Save" />
          </form>
        ) : (
          <>
            <p title="Name & Surname">
              <Icon iconName="AiOutlineUser" />
              <span>
                {currentPatient.name} {currentPatient.surname}
              </span>
            </p>
            <p title="Gender">
              <Icon
                iconName={
                  currentPatient.gender === "m"
                    ? "AiOutlineMan"
                    : "AiOutlineWoman"
                }
              />
              <span>{currentPatient.gender || "-"}</span>
            </p>
            <p title="Age">
              <Icon iconName="AiOutlineUsergroupAdd" />
              <span>{currentPatient.age || "-"}</span>
            </p>
            <p title="Weight">
              <Icon iconName="GiWeight" />
              <span>{currentPatient.weight || "-"}</span>
            </p>
            <p title="Height">
              <Icon iconName="AiOutlineColumnHeight" />
              <span>{currentPatient.height || "-"}</span>
            </p>
            <p>
              BMI:{" "}
              <span>
                {currentPatient.weight / Math.pow(currentPatient.height, 2) ||
                  "-"}
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
