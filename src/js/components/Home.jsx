import React, { useEffect } from "react";
import Form from "./Form";

const Home = () => {

	useEffect(() => {

	}, [])

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<Form />
				</div>
			</div>
		</div>
	);
};

export default Home;