import React from "react";
import JobCard from "./JobCard";
import "./JobBoard.css";

const JobBoard = ({ jobs, onJobClick, onAddEvent }) => {
	const statuses = ["pending", "in-progress", "completed", "cancelled"];

	const jobsByStatus = statuses.reduce((acc, status) => {
		acc[status] = jobs.filter((job) => job.status === status);
		return acc;
	}, {});

	return (
		<div className="board-container">
			{statuses.map((status) => (
				<div key={status} className="status-column">
					<h3 className="status-title">
						{status.charAt(0).toUpperCase() + status.slice(1)}
						<span className="job-count">
							{jobsByStatus[status]?.length || 0}
						</span>
					</h3>
					<div className="job-cards">
						{jobsByStatus[status]?.length > 0 ? (
							jobsByStatus[status].map((job) => (
								<JobCard
									key={job._id}
									job={job}
									onJobClick={onJobClick}
									onAddEvent={onAddEvent}
								/>
							))
						) : (
							<div className="empty-state">No jobs in this status</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default JobBoard;
