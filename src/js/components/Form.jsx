import React, { useEffect, useState } from "react";

const Form = () => {
    const [task, setTask] = useState([]);
    const [text, setText] = useState("");
    const sound = new Audio("/Lizard.mp3");
    const [user, setUser] = useState('');
    const [data, setData] = useState({})
    const url = 'https://playground.4geeks.com/todo'

    useEffect(()=>{
        getUser()
    }, [])

    const getUser = async () => {
        try {
            const resp = await fetch(url + '/users/' + user)

            if (!resp.ok) {
                throw new Error('Error detected')
            }
            const data = await resp.json()
            console.log(data);
            return setData(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        setTask([...task, text]); setText("");
    }

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleDelete = (index) => {
        const newTasks = task.filter((_, i) => {
            return i !== index
        })
        setTask(newTasks)

        sound.currentTime = 0;
        sound.play();
    }

    return <>
        <form onSubmit={handleSubmit}>
            <input type="text" className="form-control mb-3" placeholder="Add a task..." value={text} onChange={handleChange} />
            <input type="submit" hidden />
        </form>

        <ul className="list-group">
            {task.length === 0 ? (<li className="list-group-item text-center text-muted">No tasks remaining</li>) :
                (task.map((elem, i) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                        {elem} <span style={{ cursor: "pointer" }} onClick={() => handleDelete(i)}>
                            🦎
                        </span>
                    </li>
                )))}
        </ul>

    </>
}
export default Form