const toDoInput = document.querySelector(".todo-input");
const updateInput = document.querySelector(".update-input");
const toDoList = document.querySelector(".todo-list");

// 모든 투두 가져오는 함수
const printAllToDo = () => {
  console.log("printAllToDo 함수 실행");
  const rUrl = "/readToDo";
  fetch(rUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return res.json();
    })
    .then((data) => {
      let toDos = data.msg;
      console.log(data);

      toDos.forEach((todo) => {
        const todoLi = document.createElement("li");
        todoLi.classList.add("todoLi");

        const delSpan = document.createElement("span");
        delSpan.addEventListener("click", deleteToDoFn);
        delSpan.classList.add("del");

        const updateDiv = document.createElement("div");
        updateDiv.addEventListener("click", updateToDo);

        const todoSpan = document.createElement("span");

        updateDiv.innerText = "수정";
        todoSpan.innerText = todo.todo;
        delSpan.innerText = "삭제";

        todoLi.append(todoSpan);
        todoLi.append(delSpan);
        todoLi.append(updateDiv);

        toDoList.append(todoLi);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// 투두 생성 함수
const createTodoFn = () => {
  let inputVal = toDoInput.value;

  let formData = new FormData();
  formData.append("todo_give", inputVal);

  fetch("/createTodo", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      console.log("데이터 생성 완료", data);
      inputVal = null;
      location.reload();
    });
};

// 투두 삭제 함수
const deleteToDoFn = (e) => {
  let deleteToDoVal = e.target.previousSibling.innerText;

  let formData = new FormData();
  formData.append("todo_give", deleteToDoVal);

  fetch("/deleteTodo", { method: "DELETE", body: formData })
    .then((res) => res.json())
    .then(() => {
      location.reload();
    });
};

// 투두 수정 함수
const updateToDo = (e) => {
  let updateToDo = e.target.previousSibling.previousSibling.innerText;
  const current_todo = updateToDo;

  updateInput.classList.add("show");
  toDoInput.classList.add("close");

  updateInput.focus();
  updateInput.value = updateToDo;

  updateInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      let formData = new FormData();
      formData.append("current_todo", current_todo);
      formData.append("todo_change", updateInput.value);

      fetch("/updateToDo", { method: "POST", body: formData })
        .then((res) => res.json())
        .then(() => {
          location.reload();
        });
    }
  });
};

// 스크립트 실행시 투두 프린트
printAllToDo();

// 이벤트 실행
toDoInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    createTodoFn();
  }
});
