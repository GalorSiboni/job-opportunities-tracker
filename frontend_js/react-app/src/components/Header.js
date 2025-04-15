import React from "react";
import "./Header.css";

const Header = () => {
	const appImg = "https://ibb.co/r2t70FxQ";
	return (
		<div className="Header-Container">
			<img src={appImg} alt={"Galor Template"} className="Img" />
		</div>
	);
};

export default Header;
