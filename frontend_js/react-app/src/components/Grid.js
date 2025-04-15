import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Grid.css";

const Grid = () => {
	const [jobsInProgress, setJobsInProgress] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		fetch("http://localhost:5001")
			.then((res) => res.json())
			.then((data) => {
				console.log(data.body());
				setJobsInProgress(data.body());
				setIsLoading(false);
			})
			.catch((err) => {
				console.err(err.message);
				setIsLoading(false);
			});
	}, []);
	return (
		<div>
			{isLoading ? (
				"The data is loading"
			) : (
				<ui>
					{jobsInProgress.map((job, id) => {
						return (
							<li>
								<Card job={job} key={id} />
							</li>
						);
					})}
				</ui>
			)}
		</div>
	);
};

export default Grid;
