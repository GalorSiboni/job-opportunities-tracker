import React from "react";
import "./Header.css";

const Header = () => {
	return (
		<header className="app-header">
			<div className="header-content">
				<div className="logo-container">
					<img
						src="https://media.canva.com/v2/files/uri:ifs%3A%2F%2FM%2F161de33c-e8f3-4501-8d67-56521d042f20?csig=AAAAAAAAAAAAAAAAAAAAAM4QLo_Gj2lEBbWohg9h9pojyvTQYB0MRV3TTmTU-jpA&exp=1744840635&signer=media-rpc&token=AAIAAU0AJDE2MWRlMzNjLWU4ZjMtNDUwMS04ZDY3LTU2NTIxZDA0MmYyMAAAAAABlkCbMnhYRT7mKFgpCRHeT88ecPVmfbtZTwTdAQdG9uxTetcGhA"
						alt="Job Tracker Logo"
						className="logo-image"
					/>
					<h1>Job Opportunities Tracker</h1>
				</div>
				<div className="header-actions">
					{/* Add any header actions here if needed */}
				</div>
			</div>
		</header>
	);
};

export default Header;
