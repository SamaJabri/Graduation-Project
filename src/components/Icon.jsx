import React from "react";
import * as FontAwsome from "react-icons/ai";
import { Link } from "react-router-dom";

const Icon = (props) => {
  const icon = React.createElement(FontAwsome[props.iconName]);

  return (
    <Link to={props.link} className="icon" onClick={props.onClick}>
      {icon}
    </Link>
  );
};

export default Icon;
