import axios from 'axios';

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import loaderGif from './loader.gif';



import ListItem from './ListItem';

class App extends Component
{
  constructor()
  {
    super();

    this.state =
      {
        newTodo: '',

        editing: false,

        editingIndex: null,

        notification: null,

        todos: [
          // {
          //   id: 1, name: 'Play Some Games'
          // },
          // {
          //   id: 2, name: 'Buy Some Clothes'
          // },
          // {
          //   id: 3, name: 'Write Some Code'
          // },
          // {
          //   id: 4, name: 'Watch Some Broadcasts'
          // }
        ],
        loading: true

      };

    this.apiURL = 'https://5be6db3787be04001325b5b5.mockapi.io/todos';

    this.alert = this.alert.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    // this.generateTodoId = this.generateTodoId.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  async componentDidMount()
  {
    const response = await axios.get(this.apiURL);
    // console.log(response);
    setTimeout(() =>
    {
      this.setState(
        {
          todos: response.data,
          loading: false
        }
      )
    }, 1000);
  }

  handleChange(event)
  {
    this.setState(
      {
        newTodo: event.target.value
      }
    )
    // console.log(event.target.name, event.target.value);
  }

  // generateTodoId()
  // {
  //   const lastTodo = this.state.todos[this.state.todos.length - 1];
  //   if (lastTodo)
  //   {
  //     return lastTodo.id + 1;
  //   }
  //   return 1;
  // }

  async addTodo()
  {
    // const newTodo = {

    //   name: this.state.newTodo,

    //   id: this.generateTodoId()
    // };
    const response = await axios.post(this.apiURL, {
      name: this.state.newTodo
    });
    console.log(response);


    const todos = this.state.todos;
    todos.push(response.data);

    this.setState(
      {
        todos: todos,
        newTodo: ''
      }
    );

    this.alert('Todo Added Succesfully');

  }
  alert(notification)
  {

    this.setState(
      {
        notification
      }
    );
    setTimeout(() =>
    {
      this.setState(
        {
          notification: null
        }
      );
    }, 2000)
  }

  async deleteTodo(index)
  {
    const todos = this.state.todos;

    const todo = todos[index];

    await axios.delete(this.apiURL + '/' + todo.id);

    delete todos[index];

    this.setState({ todos });
    this.alert('Todo Deleted Succesfully');
  }


  editTodo(index)
  {

    const todo = this.state.todos[index];
    this.setState(
      {
        editing: true,
        newTodo: todo.name,
        editingIndex: index
      }
    )

  }

  async updateTodo()
  {
    const todo = this.state.todos[this.state.editingIndex]

    const response = await axios.put(this.apiURL + '/' + todo.id, {
      name: this.state.newTodo

    });
    console.log(response);


    // todo.name = this.state.newTodo;

    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    this.setState({
      todos, editing: false,
      editingIndex: null,
      newTodo: ''
    });

    this.alert('Todo Updated Succesfully');
  }


  render() 
  {
    // console.log(this.state.newTodo);

    return (

      <div className="App">

        <header className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> CRUD IN REACTJS </h1>
        </header>
        <div className="container" >
          {
            this.state.notification &&
            <div className="alert mt-3 alert-success">
              <p className="text-center">

                {this.state.notification}
              </p>
            </div>
          }
          <input type="text"
            name="todo"
            className="my-4 form-control"
            placeholder="Add a new todo"
            onChange={this.handleChange}
            value={this.state.newTodo}
          />
          <button className="btn-success mb-3 form-control"
            disabled={this.state.newTodo.length < 5}
            onClick={this.state.editing ? this.updateTodo : this.addTodo}>
            {this.state.editing ? 'Update todo' : 'Add todo'}
          </button>
          {
            this.state.loading &&
            <img src={loaderGif} alt=''></img>
          }
          {
            !this.state.editing &&

            <ul className="list-group">
              {this.state.todos.map((item, index) =>
              {
                return <ListItem
                  key={item.id}
                  item={item}
                  editTodo={() =>
                  { this.editTodo(index); }}
                  deleteTodo={() =>
                  { this.deleteTodo(index); }}
                />
              }
              )}
            </ul>


          }

        </div>

      </div>
    );
  }
}

export default App;
