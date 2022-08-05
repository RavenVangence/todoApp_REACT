import React, { useState } from 'react'

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
                <h3>{input}</h3>
            </div>
        })}
        </div>
    </>
}

export default App;