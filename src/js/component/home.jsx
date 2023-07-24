import React, { useState } from "react";

function ListItems(props) {
    
    const [textValue, setTextValue] = useState("")
    const [todos, setlistItems] = useState(props.listItems);

    //fetch GET
    useEffect(() => {
        fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Yahaira326")
            .then(response => response.json())
            .then(data => setlistItems(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    
    //fetch delete en esta funcion=

    function itemCloseButtonHandler(index) {
        const taskToDelete = todos[index];
    
        fetch(`https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Yahaira326/${taskToDelete.id}`, {
            method: "DELETE",
        })
            .then(() => {
                const updatedTodos = todos.filter((task, i) => i !== index);
                setlistItems(updatedTodos);
            })
            .catch(error => console.error("Error deleting task:", error));
    }
    
    
	//FETCH PUT en esta funcion
    function itemCheckButtonHandler(event) {
        const index = event.target.getAttribute("index");
        const taskToUpdate = todos[index];
    
        fetch(
            `https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Yahaira326/${taskToUpdate.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...taskToUpdate, done: !taskToUpdate.done }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                const updatedTodos = todos.map((task, i) => (i === index ? data : task));
                setlistItems(updatedTodos);
            })
            .catch((error) => console.error("Error updating task:", error));
    }
    
    function deleteAllItems(event) {
        setlistItems([])
    }

    //Dentro de esta funcion fetch POST
    function onKeyUpHandler(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            const newTodo = { label: e.target.value, done: false };

            fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Yahaira326", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            })
                .then((response) => response.json())
                .then((data) => {
                    setlistItems([...todos, data]);
                    setTextValue("");
                })
                .catch((error) => console.error("Error creating task:", error));
        }
    }

    let listItemsWithIndex = todos.map((e, i) => { e.index = i; return e })
    let todoItems = listItemsWithIndex.filter(e => !e.done)
    let doneItems = listItemsWithIndex.filter(e => e.done)
    let itemsLeft = todos.reduce((a, c) => a += c.done ? 0 : 1, 0)

    return (
        <>
            <h1>todos</h1>
            <div className="todo-list">
                <input type="text" placeholder="What needs to be done?" onChange={e => setTextValue(e.target.value)} onKeyUp={onKeyUpHandler} value={textValue}></input>
                <ul className="todo-items">
                    {todoItems.map((listItem) => (
                        <li key={listItem.index}>
                            <span>{listItem.label}</span>
                            <button onClick={itemCheckButtonHandler} index={listItem.index} className="bi bi-square"></button>
                            <button index={listItem.index} onClick={()=>itemCloseButtonHandler(listItem.index)} className="bi bi-trash"></button>
                        </li>
                    ))}
                </ul>
                <ul className="done-items">
                    {doneItems.map((listItem) => (
                        <li key={listItem.index}>
                            <span>{listItem.label}</span>
                            <button onClick={itemCheckButtonHandler} index={listItem.index} className="bi bi-check2-square"></button>
                            <button index={listItem.index} onClick={()=>itemCloseButtonHandler(listItem.index)} className="bi bi-trash"></button>
                        </li>
                    ))}
                </ul>
                <span>{itemsLeft} items left.</span>
                <button onClick={deleteAllItems}>Delete all items</button>
            </div>
        </>
    )
}


export default ListItems
//