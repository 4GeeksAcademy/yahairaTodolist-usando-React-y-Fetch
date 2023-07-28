import React, { useState, useEffect } from "react";

function ListItems(props) {
    
    const [textValue, setTextValue] = useState("")
    const [todos, setlistItems] = useState(props.listItems);
    function getUserToDos (){
        fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Yahaira326")
        .then(response => {
            if(response.status==400){
                createUser()
            }else if(response.ok){
              return  response.json()
            }
            
        })
        .then(data => setlistItems(data))
        .catch(error => console.error("Error fetching data:", error));
    }
    //fetch GET
    useEffect(() => {
        getUserToDos(); 
    }, []);
    
    //fetch delete en esta funcion=

    function itemCloseButtonHandler(index) {
        const updatedTodos = todos.filter((task, i) => i !== index);
    
        fetch(`https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Yahaira326`, {
            method: "PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(updatedTodos)
        })
            .then(() => {
                getUserToDos()
                
            })
            .catch(error => console.error("Error deleting task:", error));
    }
    
    
	//FETCH PUT en esta funcion
    function updateUserToDo(event) {
        if (event.key === "Enter" && event.target.value !== ""){
            const newTaskList= [...todos,{ label: event.target.value, done: false }]
            fetch(
                `https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Yahaira326`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTaskList),
                }
            )
                .then((response) => response.json())
                .then((data) =>getUserToDos() )
                .catch((error) => console.error("Error updating task:", error));
        }
    
    }
    
    function deleteAllItems(event) {
        setlistItems([])
    }

    //Dentro de esta funcion fetch POST// crea usuario 
    function createUser() {

            fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Yahaira326", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([]),
            })
                .then((response) => {
                    if(response.status==400){
                        getUserToDos()
                    }else if(response.ok){
                        getUserToDos()
                    }
                })
                .then((data) => {
                    
                })
                .catch((error) => console.error("Error creating task:", error));
        
    }

    // let listItemsWithIndex = todos.map((e, i) => { e.index = i; return e })
    // let todoItems = listItemsWithIndex.filter(e => !e.done)
    
    let doneItems = listItemsWithIndex.filter(e => e.done)
    // let itemsLeft = todos.reduce((a, c) => a += c.done ? 0 : 1, 0)

    return (
        <>
            <h1>todos</h1>
            <div className="todo-list">
                <input type="text" placeholder="What needs to be done?" onChange={e => setTextValue(e.target.value)} onKeyUp={updateUserToDo} value={textValue}></input>
                <ul className="todo-items">
                    {todoItems.map((listItem) => (
                        <li key={listItem.index}>
                            <span>{listItem.label}</span>
                            <button onClick={updateUserToDo} index={listItem.index} className="bi bi-square"></button>
                            <button index={listItem.index} onClick={()=>itemCloseButtonHandler(listItem.index)} className="bi bi-trash"></button>
                        </li>
                    ))}
                </ul>
                <ul className="done-items">
                    {doneItems.map((listItem) => (
                        <li key={listItem.index}>
                            <span>{listItem.label}</span>
                            <button onClick={updateUserToDo} index={listItem.index} className="bi bi-check2-square"></button>
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