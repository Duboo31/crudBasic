const toDoInput = document.querySelector(".todo-input");
const toDoList = document.querySelector(".todo-list");

// 모든 투두 가져오는 함수
const printAllToDo = () => {
  console.log('printAllToDo 함수 실행 ㅇㅋ')
  fetch("/readToDo")
    .then((res) => res.json())
    .then((data) => {
      console.log('data??: ', data)

      let toDos = data.msg;

      toDos.forEach((todo) => {
        const todoLi = document.createElement("li");
        todoLi.classList.add("todoLi");

        const delSpan = document.createElement("span");
        delSpan.addEventListener("click", deleteToDoFn);
        delSpan.classList.add("del");

        const updateDiv = document.createElement("div");
        updateDiv.addEventListener('click', updateToDo);

        const todoSpan = document.createElement("span");

        updateDiv.innerText = "수정";
        todoSpan.innerText = todo.todo;
        delSpan.innerText = "삭제";

        todoLi.append(todoSpan);
        todoLi.append(delSpan);
        todoLi.append(updateDiv);

        toDoList.append(todoLi);
      });
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
  let updateToDo = e.target.previousSibling.previousSibling.innerText
  console.log(updateToDo)
  let formData = new FormData();
  formData.append("_id", deleteToDoVal);
  formData.append("todo_change", updateToDo);

  fetch("/updateToDo", { method: "DELETE", body: formData })
    .then((res) => res.json())
    .then(() => {
      // location.reload();
    });
};

// 스크립트 실행시 투두 프린트
printAllToDo();

// 이벤트
toDoInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    createTodoFn();
  }
});
