import React, { useState } from 'react'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import {TiTickOutline} from 'react-icons/ti'
import {ImCross} from 'react-icons/im'
import { IconContext } from 'react-icons/lib'

const App = () => {
    const [modal, setModal] = useState(false);
    const [editValue, setEditValue] = useState('')
    const [isUserEditing, setIsUserEditing] = useState(false)
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

    // HANDLES EDIT BY FINDING WHICH TASK IS TO BE EDITED
    const handleEdit = (id) => {

        const taskBeingEdited = tasks.find((task)=> {  // Holds data that is to be edited
            return task.id === id;
        })

        setEditData(taskBeingEdited); // Stores data in editData state
        setIsUserEditing(true) //Closes main
        setIsBeingEdited(true) // Opens the edit menu
    }

    //HANDLES EDIT MENU EXITING
    const handleExitEdit = () => {
        setEditValue('')
        setIsBeingEdited(false)
        setIsUserEditing(false)
    }

    // DELETES A TASK BY MATCHING ID
    const handleDelete = (id) => {

        setTasks(tasks.filter((task) => task.id !== id));
    }

    //HANDLES THE TRANSFER OF EDITED DATA TO TASKS 
    const handleUpdate = (e) => {
        e.preventDefault();

        if (editValue) {

            setIsBeingEdited(!isBeingEdited) //REMOVES THE EDIT MENU
            setEditData({...editData, input : editValue}); // STORES THE NEW INPUT TO EDITDATA STATE

            setTasks(tasks.map((task) => {                //   iterates through the tasks
                if (task.id === editData.id) {            //   and checks which task is 
                    return {...task, input: editValue}    //   being updated. Then applies
                }                                         //   the new value to that task.
                return task;                              //
            }))

            setEditValue('')
            setModal(true);                  // sets modal to be visible
            setModalHandler('Task Updated') 

            setTimeout(()=> {
                setModal(false)
                setModalHandler('')
            },3000)
            setIsUserEditing(false)
        } else {
            setModal(true);
            setModalHandler('Invalid Input');

            setTimeout(()=> {
                setModal(false)
                setModalHandler('')
            },3000)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(input) {
            setModal(true);                  // sets modal to be visible
            setModalHandler('Task Added')    
            setTasks([...tasks, {id: new Date().getTime().toString(), input, isCompleted: false}]) //Creates tasks by adding a new task

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

        {!isUserEditing && <form className='form'>
            <div className="form-control">
                <input 
                    id='input' 
                    type="text" 
                    value={input} 
                    placeholder='write task here...' 
                    onChange={e => setInput(e.target.value)}
                />
                <button 
                    className='btn' 
                    type='submit' 
                    onClick={handleSubmit}>Add Task
                </button>
            </div>
        </form>}
        {!isUserEditing && <div className='task-container'>
        {tasks.map(task => {
            const {id, input, isCompleted} = task; //Data destructuring
            
            return(
                <IconContext.Provider value={{size: '1.5rem'}}>
                        <div className="task" key={id}> 
                        <TiTickOutline 
                            id='tick-icon' 
                            className='icon-hover' 
                            onClick={()=> handleComplete(id)} />
                        <h3 
                            id='input-task' 
                            className={isCompleted ? 'task-completed' : ''}>{input}</h3>

                        <div className='e-d-icons'> {/*Container for edit and delete buttons*/}
                        <FiEdit 
                            id='edit-icon' 
                            className='icon-hover' 
                            onClick={()=> handleEdit(id)}/>
                        <AiOutlineDelete 
                            id='delete-icon' 
                            className='icon-hover' 
                            onClick={() => handleDelete(id)}/>
                        </div>
                    </div>
                </IconContext.Provider>
        )})}
        </div>}

        {isBeingEdited && <div className='edit-modal-menu-container'>
            <IconContext.Provider value={{color: 'red'}}>
                <ImCross id='cross-icon' onClick={handleExitEdit}/>
            </IconContext.Provider>
            <input                    //Data is edited here
                type="text" 
                placeholder='Edit here...' 
                id='input-edit'
                value={editValue} 
                onChange={(e)=>setEditValue(e.target.value)}
            />
            
            <button                   //Submits the changed data to reflect on current data 
                type='submit' 
                className='btn btn-edit'
                onClick={handleUpdate}>
                Done
            </button>
        </div>}
    </>
}

export default App;