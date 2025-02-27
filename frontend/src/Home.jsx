import React, { useState, useEffect } from 'react'
import Create from './Create'
import axios from 'axios'
import {BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill} from 'react-icons/bs'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const Home = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])

    function handleEdit(id){
        axios.put('http://localhost:3001/update/'+id)
        .then(result => {
            location.reload();
        })
        .catch(err => console.log(err))
    }

    function handleDelete(id){
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => {
            location.reload();
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='home'>
            <h1>To-Do List</h1>
            <Create />
            {
                todos.length === 0
                    ?
                    <div><h2>No Records</h2></div>
                    :
                    todos.map(todo => (
                        <div className='task' key={todo._id}>
                            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                                {todo.done ? <BsFillCheckCircleFill className='icon' />:<BsCircleFill className='icon'/>}
                                <p className={todo.done ? "line_through":""} >{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default Home
