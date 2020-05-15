import React, { useState } from 'react';

const TodoList = props => {
    const [form, setForm] = useState("");
    const [list, setList] = useState([]);
    
    const onChangeHandler = e => {
        e.preventDefault();
        setForm(e.target.value);
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        setForm("");
        setList([...list, {task: form, completed: false}]);
    }

    const completionHandler = (e, index) => {
        // e.preventDefault();
        let updateItem = {task: list[index].task, completed: !list[index].completed};
        setList([...list.slice(0,index), updateItem, ...list.slice(index+1)]);
    }

    const destroyHandler = (e, index) => {
        e.preventDefault();
        setList([...list.slice(0, index), ...list.slice(index+1)])
    }

    return(
        <div>
            <table className="table table-striped col-6 mx-auto">
                <thead>
                    <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Complete</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, i) => <tr key={i}>
                            <td style={{textDecoration: item.completed ? "line-through" : "none"}}>{item.task}</td>
                            <td><input type="checkbox" checked={item.completed} onChange={(e) => completionHandler(e, i)}></input></td>
                            <td><button className="btn btn-secondary" onClick={(e) => destroyHandler(e, i)}>Remove</button></td>
                    </tr>)}
                </tbody>
            </table>
            <form className="col-6 mx-auto" onSubmit={onSubmitHandler}>
                <label>New Task</label>
                <input type="text" name="task" value={form} onChange={onChangeHandler}/>
                <input type="submit" value="Add"></input>
            </form>
        </div>
    );
}

export default TodoList;