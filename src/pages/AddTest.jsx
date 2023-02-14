import React, { useRef, useState } from "react";
import Icon from "../components/Icon";

const AddTest = () => {
  const uploadImage = useRef();
  const photoRef = useRef();

  const [imagesData, setImagesData] = useState([]);

  const [isItemInDragArea, setIsItemInDragArea] = useState(false);

  // Helping function that sets images & previewURLs data
  const handleImage = (imageFile) => {
    const previewURLObject = URL.createObjectURL(imageFile);

    const doesImageExist = imagesData.find(
      (imageData) => imageData.image.name === imageFile.name
    );

    doesImageExist && alert("Image already uploaded");

    setImagesData((imagesData) =>
      doesImageExist
        ? imagesData
        : [...imagesData, { image: imageFile, previewURL: previewURLObject }]
    );
  };

  const handlePhoto = () =>
    console.log(
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: { exact: "environment" },
          },
        })
        .then((stream) => {
          let image = photoRef.current;
          image.srcObject = stream;
          image.play();
        })
        .catch((err) => console.log("Error: ", err))
    );

  // Handle the upload from button
  const handleUpload = (e) => {
    let imageFile = e.target.files[0];

    handleImage(imageFile);

    setIsItemInDragArea(false);
  };

  // Functions to handle drag and drop
  const handleOnDragOver = (e) => {
    e.preventDefault();

    setIsItemInDragArea(true);
  };

  const handleOnDragLeave = (e) => {
    e.preventDefault();

    setIsItemInDragArea(false);
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let imageFile = e.dataTransfer.files;

    imageFile.length > 1
      ? Array.from(imageFile).map((file) => handleImage(file))
      : handleImage(imageFile[0]);

    setIsItemInDragArea(false);
  };

  // When choosing to delete an image from the uploaded
  const handleDiscard = (e, name) => {
    e.preventDefault();

    setImagesData(
      imagesData.filter((imageData) => imageData.image.name !== name)
    );
  };

  return (
    <div className="add-test">
      <p>
        You can drag and drop multiple images or files at a time or one by one
      </p>

      <div
        className={`add-test__space ${
          isItemInDragArea ? "add-test__space--drag" : ""
        }`}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        onDrop={handleOnDrop}
      >
        {imagesData.length > 0
          ? imagesData.map((imageData, index) => {
              console.log(imageData);
              return (
                <div key={index} className="add-test__image">
                  <img src={imageData.previewURL} />
                  <div className="add-test__image-options">
                    <Icon iconName="AiOutlineCheck" />
                    <Icon
                      iconName="AiOutlineClose"
                      onClick={(e) => handleDiscard(e, imageData.image.name)}
                    />
                  </div>
                </div>
              );
            })
          : "Drop Image Here"}
      </div>

      <div className="add-test__options">
        {/*         <button onClick={handlePhoto}>Take Photo</button>
         */}{" "}
        <button onClick={() => uploadImage.current.click()}>
          Upload Image / File
        </button>
        <input type="file" ref={uploadImage} onChange={handleUpload} />
      </div>
    </div>
  );
};

export default AddTest;
