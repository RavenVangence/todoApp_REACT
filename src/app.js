import React, { useState } from 'react'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import {TiTickOutline} from 'react-icons/ti'
import { IconContext } from 'react-icons/lib'

const App = () => {
    const [modal, setModal] = useState(false);
    const [editValue, setEditValue] = useState('')
    const [editData, setEditData] = useState({})
    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const [modalHandler, setModalHandler] = useState('')
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleComplete = (id) => {
        setTasks(tasks.map((task) => {
            if(task.id === id) {
                return {...task, isCompleted : !task.isCompleted}
            }
            return task;
        }))
    }
    const handleEdit = (id) => {
        const taskBeingEdited = tasks.find((task)=> {
            return task.id === id;
        })
        setEditData(taskBeingEdited);
        if(taskBeingEdited) {
            console.log(editData);
        }
        setIsBeingEdited(true)
    }
    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        if (editValue) {
            setIsBeingEdited(!isBeingEdited)
            setEditData({...editData, input : editValue});
            setTasks(tasks.map((task) => {
                if (task.id === editData.id) {
                    return {...task, input: editValue}
                }
                return task;
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input) {
            setModal(true);
            setModalHandler('Task Added')
            setTasks([...tasks, {id: new Date().getTime().toString(), input, isCompleted: false}])
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
                <input 
                    id='input' 
                    type="text" 
                    value={input} 
                    placeholder='Add task here...' 
                    onChange={e => setInput(e.target.value)}
                />
                <button 
                    className='btn' 
                    type='submit' 
                    onClick={handleSubmit}>Add Task
                </button>
            </div>
        </form>
        <div className='task-container'>
        {tasks.map(task => {
            const {id, input, isCompleted} = task;
            
            return(
                <IconContext.Provider value={{size: '1.5rem'}}>
                        <div className="task" key={id}>
                        <TiTickOutline id='tick-icon' className='icon-hover' onClick={()=> handleComplete(id)} />
                        <h3 id='input-task' className={isCompleted ? 'task-completed' : ''}>{input}</h3>
                        <div className='e-d-icons'>
                        <FiEdit id='edit-icon' className='icon-hover' onClick={()=> handleEdit(id)}/>
                        <AiOutlineDelete id='delete-icon' className='icon-hover' onClick={() => handleDelete(id)}/>
                        </div>
                    </div>
                </IconContext.Provider>
        )})}
        </div>
        {isBeingEdited && <div className='edit-modal'>
            <input 
                type="text" 
                placeholder='Edit here...' 
                value={editValue} 
                onChange={(e)=>setEditValue(e.target.value)}
            />
            <button 
                type='submit' 
                className='btn'
                onClick={handleUpdate}>
                Done
            </button>
        </div>}
    </>
}

export default App;