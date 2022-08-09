import React, { useState } from 'react'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import {TiTickOutline} from 'react-icons/ti'
import { IconContext } from 'react-icons/lib'

const App = () => {
    const [modal, setModal] = useState(false);
    const [modalHandler, setModalHandler] = useState('')
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input) {
            setModal(true);
            setModalHandler('Task Added')
            setTasks([...tasks, {id: new Date().getTime().toString(), input}])
            setTimeout(()=> {
                setModal(false)
                setModalHandler('')
            },3000)
            setInput('');
        } else {
            setModal(true);
            setModalHandler('Invalid Input');
            setTimeout(()=> {
                setModal(false)
                setModalHandler('')
            },3000)
        }
    }
    return <>
        {modal && <h3 className='modal'>{modalHandler}</h3>}
        <form className='form'>
            <div className="form-control">
                <input id='input' type="text" value={input} onChange={e => setInput(e.target.value)}/>
                <button className='btn' type='subtmit' onClick={handleSubmit}>Add Task</button>
            </div>
        </form>
        <div className='task-container'>
        {tasks.map(task => {
            const {id, input} = task;
            return <div className="task" key={id}>
                <IconContext.Provider value={{size: '1.5rem'}}>
                <TiTickOutline id='tick-icon' className='icon-hover'/>
                <h3 id='input-task'>{input}</h3>
                <div className='e-d-icons'>
                <FiEdit id='edit-icon' className='icon-hover'/>
                <AiOutlineDelete id='delete-icon' className='icon-hover'/>
                </div>
                </IconContext.Provider>
            </div>
        })}
        </div>
    </>
}

export default App;