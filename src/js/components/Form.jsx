import React, { useEffect, useState } from "react";

const Form = () => {
    const [task, setTask] = useState([]);
    const [text, setText] = useState("");
    const sound = new Audio("/Lizard.mp3");
    const [user, setUser] = useState('Lisandro');
    const [data, setData] = useState({})
    const url = 'https://playground.4geeks.com/todo'

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            const resp = await fetch(url + '/users/' + user)

            if (!resp.ok) {
                throw new Error('No user detected')
            }
            const data = await resp.json()
            console.log(data);
            setTask(data.todos);
            return setData(data);

        }
        catch (error) {
            console.log(error);
            createUser()
        }
    }

    const createUser = async () => {
        try {
            const resp = await fetch(url + '/users/' + user, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (resp.ok) return getUser();
            throw new Error('Error creating a new user')

        } catch (error) {
            console.log(error);

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text.trim() === "") return;
        try {
            const newData = {
                label: text.trim(),
                is_done: false
            }
            const resp = await fetch(url + '/todos/' + user, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            })
            if (!resp.ok) throw new Error('Error while creating task')
            setText("");
            return getUser()
        } catch (error) {
            console.log(error);
        }
    }

    // const handleChange = (e) => {
    //     setText(e.target.value)
    // }

    const handleDelete = async (index) => {
        try {
            const resp = await fetch(url + "/todos/" + index, {
                method: "DELETE"
            })
            if (!resp.ok) throw new Error('Error while deleting a task')
            sound.currentTime = 0;
            sound.play();
            return getUser()
        } catch (error) {
            console.log(error);
        }


    }

    return <>
        <h1>Tasks to do by {user}</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" className="form-control mb-3" placeholder="Add a task..." value={text} onChange={e => setText(e.target.value)} />
            <input type="submit" hidden />
        </form>

        <ul className="list-group">
            {task.length === 0 ? (<li className="list-group-item text-center text-muted">No tasks remaining</li>) :
                task.map((elem, i) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                        {elem.label} <span style={{ cursor: "pointer" }} onClick={() => handleDelete(elem.id)}>
                            🦎
                        </span>
                    </li>
                ))}
        </ul>
    </>
}

export default Form

// Pues no lo tenía tan claro... ha sido una experiencia horrorosa... me ha costado una barbaridad que todo funcione...
// Si ves algo que quieras que cambie mencionamelo, pero si da el pase... no quiero volver a tocar esto xD