import React, { useState, useEffect } from "react";
import "../../styles/index.css";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDos, settoDos] = useState([]);

	const fetchToDoList = async () => {
		try {
			const response = await fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Yahaira326");
			const data = await response.json();
			settoDos(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchToDoList();
	}, []);

	const updateToDoList = async (newToDoList) => {
		try {
			const response = await fetch("", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newToDoList)
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	const deleteToDoList = async () => {
		try {
			const response = await fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Yahaira326", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddToDo = (newToDo) => {
		const newToDoList = toDos.concat({ label: newToDo, done: false });
		settoDos(newToDoList);
		updateToDoList(newToDoList);
	};

	const handleDeleteToDo = (index) => {
		const newToDoList = toDos.filter((_, currentIndex) => index !== currentIndex);
		settoDos(newToDoList);
		updateToDoList(newToDoList);
	};

	return (
		<>
			<div className="container-fluid row d-flex justify-content-center align-items-center p-2">
				<h1 className="row justify-content-center">To-Do List</h1>
				<ul className="list-container col-12">
					<li className="list-title">
						<input
							className="text"
							onChange={(e) => setInputValue(e.target.value)}
							value={inputValue}
							onKeyPress={(e) => {
								if (e.key === "Enter" && !/^\s*$/.test(inputValue)) {
									handleAddToDo(inputValue);
									setInputValue("");
								}
							}}
							placeholder="What do you need to do today?"
						/>

					</li>
					{toDos && toDos.length > 0 && toDos.map((item, index) => (

						<li key={index} className="list-item">{item.label}
							<button className="ocultar btn btn-sm" type="button" onClick={() => handleDeleteToDo(index)}><i className="fas fa-trash-alt"></i></button>
						</li>
					))}
					<li className="list-item text-end"><em>{toDos.length} item(s) left.-</em></li>
				</ul>
			</div>
		</>
	);
};

export default Home;