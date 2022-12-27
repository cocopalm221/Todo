import React, { Component } from "react";

/*
클래스/함수 컴포넌트(용도별로 2가지 케이스)
내용 출력 전용, 데이터관리 용도

클래스 형식으로 제작되는 것 class : TypeScript
state를 리랜더링(re-randering)
Life-cycle : mounte, update, unMount...

함수 형식으로 제작되는 것 function
state를 못쓰므로 화면 갱신 어렵다.
useState() state 변경가능
-------------------------
Life-cycle 을 지원 안한다.
useEffect() Life-cycle 체크가능
*/

export default class App extends Component {
  state = {
    //할일 목록 Mock data
    // 속성명: 속성값
    todoData: [
      { id: 1, title: "할일 1", completed: false },
      { id: 2, title: "할일 2", completed: false },
      { id: 3, title: "할일 3", completed: false },
      { id: 4, title: "할일 4", completed: false },
    ],
    todoValue: "",
  };

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  deleteClick = (id) => {
    // 클릭된 ID 와 다른 요소들만 걸러서 새로운 배열 생성
    const nowTodo = this.state.todoData.filter((item) => item.id !== id);
    // console.log("클릭", nowTodo);
    this.setState({ todoData: nowTodo });
  };

  toggleClick = (id) => {
    //map을 통해서 this.state.todoDate의 complete를 업데이트 해보자
    const updateTodo = this.state.todoData.map((item) => {
      if (item.id === id) {
        //   if (item.id === true) {
        //     item.completed = false;
        //   } else {
        //     item.completed = true;
        //   }
        item.completed = !item.completed;
      }
      return item;
    });
    this.setState({ todoData: updateTodo });
    // console.log(this.state.todoData);
  };

  changeTodoValue = (event) => {
    console.log(event.target.value);
    this.setState({ todoValue: event.target.value });
  };
  addTodoSubmit = (event) => {
    //웹브라우저 새로 고침을 하면 안되므로 막아줌.
    event.preventDefault();
    //{ id: 4, title: "할일 4", completed: false },
    //todoData는 배열이고 배열의 요소들은 위처럼 구성해야하니까
    //{} 객체로 만들어줌. 그래야 .map 을 통해서 규칙적인 jsx를 리턴할 수 있으니까.
    const addTodo = {
      id: Date.now(), // id 값은 배열.map 의 key 로 활용예정, unique 값 만들려고.. 
      title: this.state.todoValue,//할일 입력창의 내용을 추가
      completed: false, //할일이 추가될 때 아직 완료한 것은 아니므로 false 초기화
    };
    //새로운 할일을 일단 복사하고, 복사된 배열에 추가하여서 업데이트
    //기존 할일을 비구조화 deestructuring 하여서 복사본 만듦
    //todoDate: [{},{},{},{},      {}]       [{}]
    this.setState({ todoData: [...this.state.todoData, addTodo] });

    //새로운 할일을 추가했으므로 내용입력창의 글자를 초기화
    this.setState({ todoValue: "" });
  };

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할일 목록</h1>
          </div>

          {this.state.todoData.map((item) => (
            <div style={this.getStyle(item.completed)} key={item.id}>
              <input
                type="checkbox"
                defaultChecked={item.completed}
                onChange={() => this.toggleClick(item.id)}
              />
              {item.title}
              <button
                style={this.btnStyle}
                onClick={() => this.deleteClick(item.id)}
              >
                x
              </button>
            </div>
          ))}

          <form style={{ display: "flex" }} onSubmit={this.addTodoSubmit}>
            <input
              style={{ flex: "10" }}
              type="text"
              placeholder="할 일을 입력하세요."
              value={this.state.todoValue}
              onChange={this.changeTodoValue}
            />
            <input style={{ flex: "1" }} type="submit" onClick={this.addTodo} />
          </form>
        </div>
      </div>
    );
  }
}
