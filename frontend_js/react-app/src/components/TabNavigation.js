import React from "react";
import "./TabNavigation.css";

const TabNavigation = ({ activeTab, setActiveTab }) => {
	const tabs = ["All", "pending", "in-progress", "completed", "cancelled"];

	return (
		<div className="tabs-container">
			{tabs.map((tab) => (
				<button
					key={tab}
					className={`tab ${activeTab === tab ? "active" : ""}`}
					onClick={() => setActiveTab(tab)}
				>
					{tab.charAt(0).toUpperCase() + tab.slice(1)}
				</button>
			))}
		</div>
	);
};

export default TabNavigation;
