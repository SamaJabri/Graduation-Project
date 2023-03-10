import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Logo from "../../assets/Logo.svg";
import LogoDarkMode from "../../assets/LogoDarkMode.svg";

import useExaminationStore from "../../store/examination/examination-store.js";
import useLaboratoryStore from "../../store/laboratory/laboratory-store";
import usePatientsStore from "../../store/patient/patients-store";
import Avatar from "../Avatar";

import Icon from "../Icon";

const Header = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  // Cast id from String to Int for comparison
  const idToInteger = parseInt(id);

  const { pathname } = useLocation();

  const [isInExamPage, setIsInExamPage] = useState(
    pathname.includes("examination") ? true : false
  );

  const [isInLabPage, setIsInLabPage] = useState(
    pathname.includes("tests/") ? true : false
  );

  // Info needed in header
  // Exam name & isFavorite --> Examination page
  // Lab name --> TestDetails Page
  const [examinationName, setExaminationName] = useState("");
  const [isExamFavorite, setIsExamFavorite] = useState();
  const [LabName, setLabName] = useState();

  // Info needed for header in an exmaination page
  const examinations = useExaminationStore((state) => state.examinations);
  const toggleIsFavoriteExamination = useExaminationStore(
    (state) => state.toggleIsFavoriteExamination
  );

  const getLabName = useLaboratoryStore((state) => state.getLabName);

  // Dark mode value and toggler
  const darkMode = usePatientsStore((state) => state.darkMode);
  const toggleDarkMode = usePatientsStore((state) => state.toggleDarkMode);

  useEffect(() => {
    if (pathname.includes("examination")) {
      setIsInExamPage(true);

      const [{ name, isFavorite }] = examinations.filter(
        (examination) => examination.id === idToInteger
      );

      setIsExamFavorite(isFavorite);
      setExaminationName(name);
    } else if (pathname.includes("tests/")) {
      setIsInLabPage(true);

      setLabName(getLabName(idToInteger));
    } else {
      setIsInExamPage(false);
      setIsInLabPage(false);
    }
  }, [isExamFavorite, isInExamPage, id]);

  const toggleIsFavorite = (e) => {
    e.preventDefault();

    setIsExamFavorite((isExamFavorite) => !isExamFavorite);

    toggleIsFavoriteExamination(idToInteger);
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
        ) : isInLabPage ? (
          <>
            <div className="header__exam-name">
              <Icon iconName="AiOutlineLeft" onClick={goToPreviousPage} />
              <h2>{LabName}</h2>
            </div>
          </>
        ) : (
          <>
            <Link to="/home">
              <img src={darkMode ? LogoDarkMode : Logo} alt="Logo" />
            </Link>

            <div className="header__avatar-switch">
              <div className="toggleWrapper">
                <input
                  type="checkbox"
                  className="dn"
                  id="dn"
                  checked={!darkMode}
                  onChange={toggleDarkMode}
                />
                <label htmlFor="dn" className="toggle">
                  <span className="toggle__handler">
                    <span className="crater crater--1"></span>
                    <span className="crater crater--2"></span>
                    <span className="crater crater--3"></span>
                  </span>
                  <span className="star star--1"></span>
                  <span className="star star--2"></span>
                  <span className="star star--3"></span>
                  <span className="star star--4"></span>
                  <span className="star star--5"></span>
                  <span className="star star--6"></span>
                </label>
              </div>
              <Avatar place="header" />
            </div>
          </>
        )}
      </div>

      <hr className="header__seperator" />
    </div>
  );
};

export default Header;
