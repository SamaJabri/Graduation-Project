import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Logo from "../../assets/Logo.svg";

import useExaminationStore from "../../store/examination/examination-store.js";

import Icon from "../Icon";

const Header = () => {
  const currentUser = {
    id: 0,
    username: "Sama",
    firstName: "Sama",
    lastName: "Jabri",
    email: "sama.jabri@outlook.com",
    password: "Sama",
  };

  const { id } = useParams();

  const [isInExamPage, setIsInExamPage] = useState(id ? true : false);

  const [examinationName, setExaminationName] = useState("");
  const [isExamFavorite, setIsExamFavorite] = useState(null);

  // Get exam name, check if it's in favorites, and update it
  const examinations = useExaminationStore((state) => state.examinations);
  const updateExamination = useExaminationStore(
    (state) => state.updateExamination
  );

  useEffect(() => {
    if (id) {
      setIsInExamPage(true);

      const [{ name, isFavorite }] = examinations.filter(
        (examination) => examination.id === Number(id)
      );

      setExaminationName(name);

      updateExamination(id, isExamFavorite);
    } else {
      setIsInExamPage(false);
    }
  }, [isExamFavorite, isInExamPage, id]);

  const toggleIsFavorite = (e) => {
    e.preventDefault();

    setIsExamFavorite((isExamFavorite) => !isExamFavorite);
  };

  //<Icon iconName="AiFillHeart" />;
  return (
    <div className="header">
      <div
        className={`header__content ${
          isInExamPage ? "header__content--exam" : ""
        }`}
      >
        {isInExamPage ? (
          <>
            <div className="header__exam-name">
              <Icon iconName="AiOutlineLeft" link="/home" />
              <h2>{examinationName}</h2>
            </div>
            {isExamFavorite ? (
              <Icon iconName="AiFillHeart" onClick={toggleIsFavorite} />
            ) : (
              <Icon iconName="AiOutlineHeart" onClick={toggleIsFavorite} />
            )}
          </>
        ) : (
          <>
            <Link to="/home">
              <img src={Logo} alt="Logo" />
            </Link>

            <div className="header__user-avatar">
              <p>{currentUser.firstName[0] + currentUser.lastName[0]}</p>
            </div>
          </>
        )}
      </div>

      <hr className="header__seperator" />
    </div>
  );
};

export default Header;
