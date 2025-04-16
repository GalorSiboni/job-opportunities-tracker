import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";
import JobBoard from "./components/JobBoard";
import AddJobForm from "./components/AddJobForm";
import EventForm from "./components/EventForm"; // We'll create this
import JobDetails from "./components/JobDetails"; // We'll create this
import "./App.css";

const App = () => {
	const [jobs, setJobs] = useState([]);
	const [activeTab, setActiveTab] = useState("All");
	const [isLoading, setIsLoading] = useState(false);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEventForm, setShowEventForm] = useState(false);
	const [showJobDetails, setShowJobDetails] = useState(false);
	const [selectedJob, setSelectedJob] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchJobs();
	}, []);

	const fetchJobs = () => {
		setIsLoading(true);
		fetch("/api/jobs")
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Server responded with status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				setJobs(data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error(err.message);
				setError(err.message);
				setIsLoading(false);
			});
	};

	const handleAddJob = (jobData) => {
		fetch("/api/jobs", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(jobData),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Failed to add job. Status: ${res.status}`);
				}
				return res.json();
			})
			.then((newJob) => {
				setJobs([...jobs, newJob]);
				setShowAddForm(false);
			})
			.catch((err) => {
				console.error(err.message);
				setError(err.message);
			});
	};

	const handleJobClick = (job) => {
		setSelectedJob(job);
		setShowJobDetails(true);
	};

	const handleAddEvent = (job) => {
		setSelectedJob(job);
		setShowEventForm(true);
	};

	const handleSubmitEvent = (eventData) => {
		fetch("/api/events", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...eventData,
				jobId: selectedJob._id,
			}),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Failed to add event. Status: ${res.status}`);
				}
				return res.json();
			})
			.then(() => {
				setShowEventForm(false);
				// You might want to refresh job data here
				fetchJobs();
			})
			.catch((err) => {
				console.error(err.message);
				setError(err.message);
			});
	};

	// This is the key fix for filtering jobs by status
	const getFilteredJobs = () => {
		if (activeTab === "All") {
			return jobs;
		}
		return jobs.filter((job) => job.status === activeTab);
	};

	return (
		<div className="app-container">
			<Header />

			<main className="main-content">
				<TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

				{error && <div className="error-message">Error: {error}</div>}

				{isLoading ? (
					<div className="loading">Loading jobs...</div>
				) : (
					<JobBoard
						jobs={getFilteredJobs()}
						onJobClick={handleJobClick}
						onAddEvent={handleAddEvent}
					/>
				)}

				<button className="add-job-button" onClick={() => setShowAddForm(true)}>
					<span className="add-icon">+</span>
					<span className="button-text">Add Job</span>
				</button>
			</main>

			{showAddForm && (
				<div className="modal-overlay">
					<div className="modal-content">
						<AddJobForm
							onSubmit={handleAddJob}
							onCancel={() => setShowAddForm(false)}
						/>
					</div>
				</div>
			)}

			{showEventForm && selectedJob && (
				<div className="modal-overlay">
					<div className="modal-content">
						<EventForm
							job={selectedJob}
							onSubmit={handleSubmitEvent}
							onCancel={() => setShowEventForm(false)}
						/>
					</div>
				</div>
			)}

			{showJobDetails && selectedJob && (
				<div className="modal-overlay">
					<div className="modal-content">
						<JobDetails
							job={selectedJob}
							onClose={() => setShowJobDetails(false)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
