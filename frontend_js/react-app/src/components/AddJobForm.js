import React, { useState } from "react";
import "./AddJobForm.css";

const AddJobForm = ({ onSubmit, onCancel }) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "pending",
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
		<form className="add-job-form" onSubmit={handleSubmit}>
			<h2>Add New Job</h2>

			<div className="form-group">
				<label htmlFor="title">Job Title*</label>
				<input
					id="title"
					name="title"
					value={formData.title}
					onChange={handleChange}
					placeholder="e.g. Frontend Developer"
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="description">Description</label>
				<textarea
					id="description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Add job details here..."
					rows="4"
				/>
			</div>

			<div className="form-group">
				<label htmlFor="status">Status</label>
				<select
					id="status"
					name="status"
					value={formData.status}
					onChange={handleChange}
				>
					<option value="pending">Pending</option>
					<option value="in-progress">In Progress</option>
					<option value="completed">Completed</option>
					<option value="cancelled">Cancelled</option>
				</select>
			</div>

			<div className="form-actions">
				<button type="button" className="cancel-button" onClick={onCancel}>
					Cancel
				</button>
				<button type="submit" className="submit-button">
					Save Job
				</button>
			</div>
		</form>
	);
};

export default AddJobForm;
