import React, { useState } from "react";
import "./EventForm.css";

const EventForm = ({ job, onSubmit, onCancel }) => {
	const [formData, setFormData] = useState({
		title: "",
		type: "phone",
		status: "scheduled",
		date: new Date().toISOString().split("T")[0],
		notes: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form className="event-form" onSubmit={handleSubmit}>
			<h2>Add New Event</h2>
			<p className="job-reference">For: {job.title}</p>

			<div className="form-group">
				<label htmlFor="title">Event Title*</label>
				<input
					id="title"
					name="title"
					value={formData.title}
					onChange={handleChange}
					placeholder="e.g. Phone Interview with HR"
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="type">Event Type</label>
				<select
					id="type"
					name="type"
					value={formData.type}
					onChange={handleChange}
				>
					<option value="phone">Phone</option>
					<option value="online">Online</option>
					<option value="onsite">Onsite</option>
					<option value="assignment">Assignment</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor="status">Status</label>
				<select
					id="status"
					name="status"
					value={formData.status}
					onChange={handleChange}
				>
					<option value="scheduled">Scheduled</option>
					<option value="rescheduled">Rescheduled</option>
					<option value="cancelled">Cancelled</option>
					<option value="completed">Completed</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor="date">Date*</label>
				<input
					id="date"
					name="date"
					type="date"
					value={formData.date}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="notes">Notes</label>
				<textarea
					id="notes"
					name="notes"
					value={formData.notes}
					onChange={handleChange}
					placeholder="Add any details about this event..."
					rows="3"
				/>
			</div>

			<div className="form-actions">
				<button type="button" className="cancel-button" onClick={onCancel}>
					Cancel
				</button>
				<button type="submit" className="submit-button">
					Save Event
				</button>
			</div>
		</form>
	);
};

export default EventForm;
