import React from "react";
import "./JobCard.css";

const JobCard = ({ job, onJobClick, onAddEvent }) => {
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "short", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const truncate = (text, maxLength) => {
		if (!text) return "";
		return text.length > maxLength
			? `${text.substring(0, maxLength)}...`
			: text;
	};

	return (
		<div className={`job-card status-${job.status}`}>
			<div className="card-header">
				<div className="company-logo">
					{job.img ? (
						<img src={job.img} alt={job.title} />
					) : (
						<div className="placeholder-logo">
							{job.title ? job.title.charAt(0).toUpperCase() : "J"}
						</div>
					)}
				</div>
				<div className="job-info">
					<h3 className="job-title">{truncate(job.title, 30)}</h3>
					<p className="date-applied">Added: {formatDate(job.createdAt)}</p>
				</div>
			</div>

			{job.description && (
				<p className="job-description">{truncate(job.description, 100)}</p>
			)}

			<div className="job-actions">
				<button className="view-details" onClick={() => onJobClick(job)}>
					Details
				</button>
				<button
					className="add-event"
					onClick={(e) => {
						e.stopPropagation();
						onAddEvent(job);
					}}
				>
					+ Event
				</button>
			</div>
		</div>
	);
};

export default JobCard;
