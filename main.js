document.addEventListener("DOMContentLoaded", function () {
  let heading = document.querySelector(".heading");
  let currentDay = document.querySelector(".currentdate");
  let currentDate = new Date();
  let dateOnly = currentDate.getDate();
  currentDay.innerHTML = dateOnly;

  for (let i = 1; i <= 9; i++) {
    let newHeader = document.createElement("th");
    newHeader.innerHTML = `<th>${dateOnly + i}</th>`;
    heading.appendChild(newHeader);
  }

  let tbody = document.querySelector(".tablebody");
  const EmployName = ["santhosh", "kumar", "karan", "madhan", "anbu"];

  EmployName.forEach((names) => {
    let newrow = document.createElement("tr");
    newrow.classList.add("newrow");
    newrow.innerHTML = `<td>${names}</td>`;
    for (let i = 1; i <= 10; i++) {
      newrow.innerHTML += `<td></td>`;
    }
    tbody.appendChild(newrow);
  });

  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("task");
  const timeInput = document.getElementById("time");
  const taskContainer = document.querySelector(".taskcontainer");

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addData(taskInput.value, timeInput.value);
    taskInput.value = "";
    timeInput.value = "";
  });

  const addData = (Task, Time) => {
    console.log(Task + "," + Time);
    let addTask = document.createElement("p");
    addTask.classList.add("dragcontent");
    addTask.setAttribute("draggable", "true");
    addTask.innerHTML = `${Task} and ${Time} days`;

    addTask.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", Task + "," + Time);
    });

    taskContainer.appendChild(addTask);
  };

  const tableData = document.querySelectorAll(".tablebody td");

  tableData.forEach((Data) => {
    Data.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    Data.addEventListener("drop", function (e) {
      e.preventDefault();
      const taskData = e.dataTransfer.getData("text/plain");
      const [Task, Time] = taskData.split(",");

      const colIndex = [...Data.parentElement.children].indexOf(Data);
      const rowIndex = [...Data.parentElement.parentElement.children].indexOf(
        Data.parentElement
      );
      console.log(rowIndex);
      console.log(colIndex);
      Data.rowSpan = 1;
      Data.colSpan = parseInt(Time);
      Data.innerHTML = Task;
      Data.classList.add("color");

      for (let i = colIndex + 1; i < colIndex + parseInt(Time); i++) {
        if (Data.parentElement.children[i]) {
          Data.parentElement.children[i].style.display = "none";
        }
      }
    });
  });
});
