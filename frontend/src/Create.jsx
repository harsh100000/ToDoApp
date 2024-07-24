import React, { useState } from 'react'
import axios from 'axios'

function Create(){
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  const [task, setTask] = useState()
  const handleAdd = () =>{
    axios.post(`${API_URL}/add`, {task:task})
    .then(result => {
      location.reload();
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='create_form' >
        <input placeholder='Add a task' type="text" onChange={(e)=>setTask(e.target.value)}/>
        <button type='button' onClick={handleAdd} >Add</button>
    </div>
  )
}

export default Create
