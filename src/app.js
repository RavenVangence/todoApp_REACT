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
            },2000)
            setInput('');
        } else {
            setModal(true);
            setModalHandler('Invalid Input');
            setTimeout(()=> {
                setModal(false)
                setModalHandler('')
            },2000)
        }
    }
    return <>
        {modal && <p>{modalHandler}</p>}
        <form className='form'>
            <div className="form-control">
                <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
                <button type='subtmit' onClick={handleSubmit}>Add Task</button>
            </div>
        </form>
        {tasks.map(task => {
            const {id, input} = task;
            return <div className="task" key={id}>
                <h5>{input}</h5>
            </div>
        })}
    </>
}

export default App;