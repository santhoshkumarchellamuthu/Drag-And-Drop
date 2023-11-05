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

      Data.rowSpan = 1;
      Data.colSpan = parseInt(Time);
      Data.setAttribute("draggable", "true");
      Data.innerHTML = Task;
      Data.classList.add("color");
      let block = null;

      for (let i = colIndex + 1; i < colIndex + parseInt(Time); i++) {
        if (Data.parentElement.children[i]) {
          Data.parentElement.children[i].style.display = "none";
          block = Data.parentElement.children[i];
        }

        const tds = document.querySelectorAll(".tablebody td");
        let dragging = null;
        let previous = null;
        const clearCellContent = (td) => {
          td.innerHTML = "";
          td.classList.remove("color");
          td.colSpan = 1;
          td.style.display = "table-cell";

          const row = td.parentElement.children;
          const cellIndex = Array.from(row).indexOf(td);

          for (let i = cellIndex + 1; i < row.length; i++) {
            if (row[i].style.display === "none") {
              row[i].style.display = "table-cell";
              if (row[i].colSpan > 1) {
                for (let j = 1; j < row[i].colSpan; j++) {
                  const cellToRestore = row[i + j];

                  cellToRestore.innerHTML = "";
                  cellToRestore.classList.remove("color");
                  cellToRestore.style.display = "table-cell";
                }
              }
            } else {
              break;
            }
          }
        };
        tds.forEach((td) => {
          td.addEventListener("dblclick", function (event) {
            clearCellContent(td);
          });
          let hiddenCells = [];
          td.addEventListener("dragstart", function (event) {
            if (td.innerHTML !== "") {
              previous = td;
              event.dataTransfer.setData("text/plain", previous.innerHTML);
              previous.innerHTML = "";
              previous.classList.remove("color");
              previous.colSpan = 1;

              const row = td.parentElement.children;
              const cellIndex = Array.from(row).indexOf(td);
              for (let i = cellIndex + 1; i < row.length; i++) {
                if (row[i].style.display === "none") {
                  row[i].style.display = "table-cell";
                  if (row[i].colSpan > 1) {
                    for (let j = 1; j < row[i].colSpan; j++) {
                      const cellToRestore = row[i + j];
                      cellToRestore.innerHTML = "";
                      cellToRestore.classList.remove("color");
                      cellToRestore.style.display = "table-cell";
                    }
                  }
                } else {
                  break;
                }
              }
            }
          });

          td.addEventListener("dragover", function (event) {
            event.preventDefault();
          });

          td.addEventListener("drop", (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData("text/plain");
            console.log(data);
            if (td.innerHTML === "") {
              td.innerHTML = data;
              td.colSpan = parseInt(data.split(",")[1]);
              td.classList.add("color");

              hiddenCells.forEach((hiddenCell) => {
                hiddenCell.style.display = "table-cell";
                hiddenCell.innerHTML = "";
                hiddenCell.classList.remove("color");
              });
              hiddenCells = [];
            }
          });
        });
      }
    });
  });
});
