import React from "react";
import Icon from "../Icon";

import useExaminationStore from "../../store/examination/examination-store";

const Navbar = () => {
  const examinations = useExaminationStore((state) => state.examinations);

  const getFavorites = () =>
    examinations.filter((examination) => examination.isFavorite);

  console.log(getFavorites());

  return (
    <div className="navbar">
      <Icon iconName="AiOutlineHome" link="/home" />
      <Icon iconName="AiOutlineSearch" />
      <Icon iconName="AiOutlinePlusCircle" link="/add" />
      <Icon iconName="AiTwotoneExperiment" link="/tests" />
      <Icon iconName="AiOutlineHeart" />
    </div>
  );
};

export default Navbar;
