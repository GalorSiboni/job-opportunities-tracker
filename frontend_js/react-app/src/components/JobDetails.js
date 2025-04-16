import React, { useState, useEffect } from "react";
import "./JobDetails.css";

const JobDetails = ({ job, onClose }) => {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (job && job._id) {
			setIsLoading(true);
			fetch(`/api/events/jobs/${job._id}`)
				.then((res) => {
					if (!res.ok) {
						throw new Error("Failed to fetch events");
					}
					return res.json();
				})
				.then((data) => {
					setEvents(data);
					setIsLoading(false);
				})
				.catch((err) => {
					console.error("Error fetching events:", err);
					setError(err.message);
					setIsLoading(false);
				});
		}
	}, [job]);

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const formatEventDate = (dateString) => {
		const options = {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(dateString).toLocaleString(undefined, options);
	};

	const getStatusClass = (status) => {
		const statusMap = {
			pending: "status-pending",
			"in-progress": "status-in-progress",
			completed: "status-completed",
			cancelled: "status-cancelled",
			scheduled: "status-scheduled",
			rescheduled: "status-rescheduled",
		};
		return statusMap[status] || "";
	};

	return (
		<div className="job-details">
			<div className="job-details-header">
				<h2>{job.title}</h2>
				<button className="close-button" onClick={onClose}>
					×
				</button>
			</div>

			<div className="job-info-section">
				<div className="job-status">
					<span className={`status-badge ${getStatusClass(job.status)}`}>
						{job.status.charAt(0).toUpperCase() + job.status.slice(1)}
					</span>
					<span className="added-date">
						Added on {formatDate(job.createdAt)}
					</span>
				</div>

				{job.description && (
					<div className="job-description-full">
						<h3>Description</h3>
						<p>{job.description}</p>
					</div>
				)}
			</div>

			<div className="events-section">
				<h3>Events</h3>

				{isLoading ? (
					<p className="loading-events">Loading events...</p>
				) : error ? (
					<p className="events-error">Error loading events: {error}</p>
				) : events.length === 0 ? (
					<p className="no-events">No events for this job yet</p>
				) : (
					<ul className="events-list">
						{events.map((event) => (
							<li
								key={event._id}
								className={`event-item ${getStatusClass(event.status)}`}
							>
								<div className="event-header">
									<h4>{event.title}</h4>
									<span
										className={`event-status ${getStatusClass(event.status)}`}
									>
										{event.status}
									</span>
								</div>
								<div className="event-meta">
									<span className="event-type">{event.type}</span>
									<span className="event-date">
										{formatEventDate(event.date)}
									</span>
								</div>
								{event.notes && <p className="event-notes">{event.notes}</p>}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default JobDetails;
