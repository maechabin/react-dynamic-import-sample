import React from "react";
import { createStore } from "redux";
import { connect } from "react-redux";

/** State */
const initialState = {
  text: "",
  list: []
};

/** Store */
export const store = createStore(reducer, initialState);

/** Action */
const CHANGE_TEXT = "change_text";
const ADD_TODO = "add_todo";
const REMOVE_TODO = "remove_todo";

function addToDo(payload) {
  return {
    type: ADD_TODO,
    payload
  };
}
function changeText(payload) {
  return {
    type: CHANGE_TEXT,
    payload
  };
}
function removeToDo(payload) {
  return {
    type: REMOVE_TODO,
    payload
  };
}

/** Reducer */
function reducer(state = {}, action) {
  switch (action.type) {
    case CHANGE_TEXT:
      return Object.assign({}, state, {
        text: action.payload
      });
    case ADD_TODO:
      return Object.assign({}, state, {
        list: state.list.concat({
          id: action.payload,
          todo: state.text
        }),
        text: ""
      });
    case REMOVE_TODO:
      return Object.assign({}, state, {
        list: action.payload
      });
    default:
      return state;
  }
}

/** View */
class ToDoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      component1: null,
      component2: null,
      component3: null
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    const { default: Component1 } = await import("./Component1");
    const { default: Component2 } = await import("./Component2");
    console.log(Component1);
    this.setState({
      component1: Component1(),
      component2: Component2()
    });
  }
  handleClick(e) {
    e.preventDefault();
    import("./Component2")
      .then(a => {
        return this.setState({
          component3: a.default()
        });
      })
      .catch(e => {
        return console.log(e);
      });
  }
  render() {
    return (
      <div>
        {this.state.component1 || <div>...</div>}
        {this.state.component2 || <div>...</div>}
        {this.state.component3}
        <button onClick={this.handleClick}>コンポーネント追加</button>
        <h1>ToDoリスト</h1>
        <Input text={this.props.text} handleChange={this.props.handleChange} />
        <Button text={this.props.text} handleClick={this.props.handleClick} />
        <List list={this.props.list} handleDelete={this.props.handleDelete} />
      </div>
    );
  }
}

const Input = props => {
  return <input type="text" value={props.text} onChange={props.handleChange} />;
};

const Button = props => {
  function handleClick(e) {
    e.preventDefault();
    if (props.text !== "") {
      const id = Date.now();
      return props.handleClick(id);
    }
    return;
  }
  return <button onClick={handleClick}>Send</button>;
};

const List = props => {
  const todoList = props.list.map((item, i) => {
    return (
      <li key={item.id}>
        {item.todo}
        <DeleteButton
          index={i}
          list={props.list}
          handleDelete={props.handleDelete}
        />
      </li>
    );
  });
  return <ul>{todoList}</ul>;
};

const DeleteButton = props => {
  function handleClick() {
    const newList = props.list.filter((item, i) => {
      return i !== props.index;
    });
    return props.handleDelete(newList);
  }
  return <button onClick={handleClick}>Delete</button>;
};

function mapStateToProps(state) {
  return {
    text: state.text,
    list: state.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange(e) {
      const newText = e.target.value;
      return dispatch(changeText(newText));
    },
    handleClick(id) {
      return dispatch(addToDo(id));
    },
    handleDelete(list) {
      return dispatch(removeToDo(list));
    }
  };
}

const ToDoAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoApp);

export default ToDoAppContainer;
