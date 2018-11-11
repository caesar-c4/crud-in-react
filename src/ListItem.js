import React from 'react';

const ListItem = (props) =>
{
    return <li
        className="list-group-item padding-left">





        {props.item.name}
        <button className="btn-sm btn  ml-4 btn-info px-8 "
            onClick={props.editTodo}
        >U</button>
        <button className="btn-sm btn px-8 ml-4 btn-danger"
            onClick={props.deleteTodo}
        >X</button>
    </li>
}

export default ListItem;