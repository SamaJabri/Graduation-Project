import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Logo from "../../assets/Logo.svg";

import useExaminationStore from "../../store/examination/examination-store.js";
import Avatar from "../Avatar";

import Icon from "../Icon";

const Header = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const pagePath = String(window.location.pathname);

  const [isInExamPage, setIsInExamPage] = useState(
    pagePath.includes("examination") ? true : false
  );

  // Info needed in header (exam name & isFavorite)
  const [examinationName, setExaminationName] = useState("");
  const [isExamFavorite, setIsExamFavorite] = useState();

  const examinations = useExaminationStore((state) => state.examinations);
  const toggleIsFavoriteExamination = useExaminationStore(
    (state) => state.toggleIsFavoriteExamination
  );

  useEffect(() => {
    if (pagePath.includes("examination")) {
      setIsInExamPage(true);

      const [{ name, isFavorite }] = examinations.filter(
        (examination) => examination.id === Number(id)
      );
      console.log("Store:", isFavorite);
      setIsExamFavorite(isFavorite);
      setExaminationName(name);

      //toggleIsFavoriteExamination(id);
    } else {
      setIsInExamPage(false);
    }
  }, [isExamFavorite, isInExamPage, id]);

  const toggleIsFavorite = (e) => {
    e.preventDefault();
    console.log("Before:", isExamFavorite);
    //setIsExamFavorite((isExamFavorite) => !isExamFavorite);
    console.log("After:", isExamFavorite);
    console.log(id);
    toggleIsFavoriteExamination(id);
  };

  const goToPreviousPage = (e) => {
    e.preventDefault();

    navigate(-1);
  };

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
              <Icon iconName="AiOutlineLeft" onClick={goToPreviousPage} />
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

            <Avatar place="header" />
          </>
        )}
      </div>

      <hr className="header__seperator" />
    </div>
  );
};

export default Header;
