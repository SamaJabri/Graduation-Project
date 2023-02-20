import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Logo from "../../assets/Logo.svg";

import useExaminationStore from "../../store/examination/examination-store.js";
import Avatar from "../Avatar";

import Icon from "../Icon";

const Header = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const pagePath = window.location.pathname.split("/")[1];

  const [isInExamPage, setIsInExamPage] = useState(
    pagePath === "examination" ? true : false
  );

  const [examinationName, setExaminationName] = useState("");
  const [isExamFavorite, setIsExamFavorite] = useState();

  // Get exam name, check if it's in favorites, and update it
  const examinations = useExaminationStore((state) => state.examinations);
  const updateExamination = useExaminationStore(
    (state) => state.updateExamination
  );

  useEffect(() => {
    if (pagePath === "examination") {
      setIsInExamPage(true);

      const [{ name, isFavorite }] = examinations.filter(
        (examination) => examination.id === Number(id)
      );

      setIsExamFavorite(isFavorite);
      setExaminationName(name);

      updateExamination(id, isExamFavorite);
    } else {
      setIsInExamPage(false);
    }
  }, [isInExamPage, id]);

  const toggleIsFavorite = (e) => {
    e.preventDefault();

    setIsExamFavorite((isExamFavorite) => !isExamFavorite);
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
