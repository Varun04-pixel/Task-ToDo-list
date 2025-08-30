const addInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

async function editTask(taskId) {
  const editInput = document.getElementById(`editInput-${taskId}`);
  if (editInput.value.trim() == "") {
    return;
  }
  const response = await fetch("/editTask", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId,
      Task: editInput.value,
    }),
  });
  const result = await response.json();
  // console.log(result);
  if (result.success) {
    const liToEdit = document.querySelector(`li[data-id="${taskId}"]`);
    liToEdit.innerHTML = `
      <p class="task-value">${result.Task}</p>      
        <div class='cont'>
          <div class="dropdown">
            <img class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsUlEQVR4nO2Zu07DMBhGvTBQJoSEuKxAJQQTjCzM5XVaHqBMMLHxCvAMTaWKGRiYuIitXMRCKQNMBxn+IjeEtFFrOxE+Uoe0sX0+X5LKVqoAAMtAC+gAJ8C0KgrACtCmnwtgRuUdoAzci3RDwlzJ9VmuR4Jv+bYhX5LvF4wQx6pI8rHfNS8qDWAHiIA3/NBIkC+Jk6aZJr/nSXpYeT1CS2k9r3kHqsC8cr9gSwPky2mVNeXGqm3xsctLga7cPKfcPudbwFSCvA6leQRWh6n0C5vi1uRdBYhNmwiYHGnaeAig/w70uARmxyLvIgCwLk08i/xPiJHlHQXovWOORNoM0RxJ3lGAG2liW67NEL/kgVP9yUUAYFOq1wt4AtgCDoGnv542mX0sBzgwevmBfs6Tpk3eAtzFpK+BOrA2Nh/LAfQivQX2gQ0rPrYXcVYIATxDCOAZQgDPEAJ4hhDAM4QAniEE8AwhgGf4jwFepYz1bfVBAIvi0slSqLczVlOeAXbFJcpSqGIccNT0wZpVywTkME/Lf4hLRWVBtjryQj2TfGwkIuPAwyVdaTtbzwcCAVUoPgEGo4/YLtUoJgAAAABJRU5ErkJggg==" height="20" width="20" class="edit-img" alt="create-new">
            <ul class="dropdown-menu dropdown-menu-end" style="padding: 30%">
              <input id="editInput-${result.taskId}" type="text" style="width: 75% !important; display: inline;" class="dropdown-item-secondary form-control" placeholder="Edit your task">
              <button onclick="editTask('${result.taskId}')" class="btn btn-primary" style="width: 20%; margin-left: 3%; float: right !important;" id="saveBtn">Save</button>
            </ul>
          </div>

          <div class="delete-btn">
            <img onclick="removeTask('${result.taskId}')" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEAklEQVR4nO2aSWxNURjHXwlCmzShZjEUUUptDIlaqIUhqAWJmjZIKGoICyppJWYqpg2KIoaFsUhZqMSQKBKlqIUxrZlEaSsh9C+X/5OXl+87r3d43Cb+STf3d7/vnP/pued857SBgEcC0BTABgCvEFkvAayzYgJ+E4D1sK+1Ab8Jv0fZ0pB6vJsa/M0E/CZQ0XrflQC0AXAKQC3+nWoBnLT64sbIFfhHl+12vjWAAwCq4D9VAdgPICGSiQQAL+B/VQJoZTKyFw1H+SYjH9Bw9N5kpAgNR0X1/Oz/yz8CcBj+1SE7RlbCv8q1Y2Qq/KspdowMVJLcBDCdG5KkrwDmsz7TZNVNWQC+KbyCbdxS+EA7RuKVJAvINyv8Pnl/g5EUvnNf4XnkCxUeX28jTPROSLKJbJ7SyGPyRIORbnznicLnkucJ7K0tE0x0TUh0gmy00onX5G0NRn6V4wDeKHwUuTUFw3XViZECIVEpWZLSic/kcQYjsXynWuG9yO8IbJ8TI9mGjjYD8EPg1rMY/tQJvC6Ea/HN2MYngS93YmSiMmK/zgKGlas5uXSqrCFrocRWhJyJJE1wYkRbeQZFOD0mGBaLtxE6epl8sGnFs2skVpkeGeTWSU1SV/KnAntC1k2JLSCfLLC64PflxIx0Wswmy1U6k0x+T2BlZH2V2BzyFQKrdGSCCS9pJzPuvqapVyKw6xGmzjTyPQIrdmNkl5YQwFClM2nkxQK7SDZciU01DOBON0aWCgmfkXVQOjOOvFBgp8nSldj25M8FtsSNEanB77ywjlGW2OBicERghw0f8xfmbMI2xAFyaqS3MnI9yMsFNpMsX2C7yWYJ7AFZT6XNJDdGmiqjM4L8nKFC3iqwLYbK9izZSG0WODZiqFLnkG03LM+rBbbKsLxuI8vUqmq3Ri4IiTeQLRbYGrLlAltGtlZgi8g2Cuy8F0Z2CImPkY0X2FayBQLLItsmsHSy4wLb7oURqUO3yVIMG+ZMgc0wbHj9yEq1AXBrZJSQuMpw7jhCliGwSWRHBRZHJv0VYKQXRrpDViulyi3k87FCzBiyM0pVnKC0leiFkca8HRFvM4SaKljCpAkxw5QSJFiDDRJirLYbuzbCBh4apkn4Dl5i6FTQ/A1lx88QYso9MaFMhT/HTmG/uMfnyUJMH+UqaJXheF3opZE8Q7kRvjo95fMuQkxnsmfKapavXUF5ZWS20MBdAI2se6iw5zW84JOm1gAy651QZTJXmRAz20sj0ocLniClheCjct1TTRauryH/cCCeb7wy0gn/Th29NBIjTIe/oVqrbc+MGEqHaKvUUxMu/vvHrXKiYaSd4XYxGnoEoKXnRmjG2husnVy7SfdCVu6Ddj/yn82TIp0pyam8AAAAAElFTkSuQmCC" height="20" width="20" class="bin-img" alt="waste">
          </div>
        </div>
      `;
    editInput.value = "";
  } else {
    console.log("error editing the task: " + result.error);
  }
}

async function getTasks() {
  const response = await fetch("/getTasks");
  const result = await response.json();
  // console.log(result)
  if (result.success) {
    for (let i = 0; i < result.tasks.length; i++) {
      taskList.innerHTML += `
      <li data-id="${result.tasks[i]._id}" class="list-group-item bg-transparent text-light"><p id="taskValue" class="task-value">${result.tasks[i].task}</p>      
        <div class='cont'>
          <div class="dropdown">
            <img class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsUlEQVR4nO2Zu07DMBhGvTBQJoSEuKxAJQQTjCzM5XVaHqBMMLHxCvAMTaWKGRiYuIitXMRCKQNMBxn+IjeEtFFrOxE+Uoe0sX0+X5LKVqoAAMtAC+gAJ8C0KgrACtCmnwtgRuUdoAzci3RDwlzJ9VmuR4Jv+bYhX5LvF4wQx6pI8rHfNS8qDWAHiIA3/NBIkC+Jk6aZJr/nSXpYeT1CS2k9r3kHqsC8cr9gSwPky2mVNeXGqm3xsctLga7cPKfcPudbwFSCvA6leQRWh6n0C5vi1uRdBYhNmwiYHGnaeAig/w70uARmxyLvIgCwLk08i/xPiJHlHQXovWOORNoM0RxJ3lGAG2liW67NEL/kgVP9yUUAYFOq1wt4AtgCDoGnv542mX0sBzgwevmBfs6Tpk3eAtzFpK+BOrA2Nh/LAfQivQX2gQ0rPrYXcVYIATxDCOAZQgDPEAJ4hhDAM4QAniEE8AwhgGf4jwFepYz1bfVBAIvi0slSqLczVlOeAXbFJcpSqGIccNT0wZpVywTkME/Lf4hLRWVBtjryQj2TfGwkIuPAwyVdaTtbzwcCAVUoPgEGo4/YLtUoJgAAAABJRU5ErkJggg==" height="20" width="20" class="edit-img" alt="create-new">
            <ul class="dropdown-menu dropdown-menu-end" style="padding: 30%">
              <input id="editInput-${result.tasks[i]._id}" type="text" style="width: 75% !important; display: inline;" class="dropdown-item-secondary form-control" placeholder="Edit your task">
              <button onclick="editTask('${result.tasks[i]._id}')" class="btn btn-primary" style="width: 20%; margin-left: 3%; float: right !important;" id="saveBtn">Save</button>
            </ul>
          </div>

          <div class="delete-btn">
            <img onclick="removeTask('${result.tasks[i]._id}')" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEAklEQVR4nO2aSWxNURjHXwlCmzShZjEUUUptDIlaqIUhqAWJmjZIKGoICyppJWYqpg2KIoaFsUhZqMSQKBKlqIUxrZlEaSsh9C+X/5OXl+87r3d43Cb+STf3d7/vnP/pued857SBgEcC0BTABgCvEFkvAayzYgJ+E4D1sK+1Ab8Jv0fZ0pB6vJsa/M0E/CZQ0XrflQC0AXAKQC3+nWoBnLT64sbIFfhHl+12vjWAAwCq4D9VAdgPICGSiQQAL+B/VQJoZTKyFw1H+SYjH9Bw9N5kpAgNR0X1/Oz/yz8CcBj+1SE7RlbCv8q1Y2Qq/KspdowMVJLcBDCdG5KkrwDmsz7TZNVNWQC+KbyCbdxS+EA7RuKVJAvINyv8Pnl/g5EUvnNf4XnkCxUeX28jTPROSLKJbJ7SyGPyRIORbnznicLnkucJ7K0tE0x0TUh0gmy00onX5G0NRn6V4wDeKHwUuTUFw3XViZECIVEpWZLSic/kcQYjsXynWuG9yO8IbJ8TI9mGjjYD8EPg1rMY/tQJvC6Ea/HN2MYngS93YmSiMmK/zgKGlas5uXSqrCFrocRWhJyJJE1wYkRbeQZFOD0mGBaLtxE6epl8sGnFs2skVpkeGeTWSU1SV/KnAntC1k2JLSCfLLC64PflxIx0Wswmy1U6k0x+T2BlZH2V2BzyFQKrdGSCCS9pJzPuvqapVyKw6xGmzjTyPQIrdmNkl5YQwFClM2nkxQK7SDZciU01DOBON0aWCgmfkXVQOjOOvFBgp8nSldj25M8FtsSNEanB77ywjlGW2OBicERghw0f8xfmbMI2xAFyaqS3MnI9yMsFNpMsX2C7yWYJ7AFZT6XNJDdGmiqjM4L8nKFC3iqwLYbK9izZSG0WODZiqFLnkG03LM+rBbbKsLxuI8vUqmq3Ri4IiTeQLRbYGrLlAltGtlZgi8g2Cuy8F0Z2CImPkY0X2FayBQLLItsmsHSy4wLb7oURqUO3yVIMG+ZMgc0wbHj9yEq1AXBrZJSQuMpw7jhCliGwSWRHBRZHJv0VYKQXRrpDViulyi3k87FCzBiyM0pVnKC0leiFkca8HRFvM4SaKljCpAkxw5QSJFiDDRJirLYbuzbCBh4apkn4Dl5i6FTQ/A1lx88QYso9MaFMhT/HTmG/uMfnyUJMH+UqaJXheF3opZE8Q7kRvjo95fMuQkxnsmfKapavXUF5ZWS20MBdAI2se6iw5zW84JOm1gAy651QZTJXmRAz20sj0ocLniClheCjct1TTRauryH/cCCeb7wy0gn/Th29NBIjTIe/oVqrbc+MGEqHaKvUUxMu/vvHrXKiYaSd4XYxGnoEoKXnRmjG2husnVy7SfdCVu6Ddj/yn82TIp0pyam8AAAAAElFTkSuQmCC" height="20" width="20" class="bin-img" alt="waste">
          </div>
        </div>
      </li>`;
    }
  } else {
    console.log("error fetching the tasks: " + result.error);
  }
}
getTasks();

addBtn.addEventListener("click", async function () {
  if (addInput.value.trim() == "") {
    return;
  }
  const response = await fetch("/addTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: addInput.value,
    }),
  });
  const result = await response.json();
  // console.log(result);
  if (result.success) {
    taskList.innerHTML += `
      <li data-id="${result.addedTask[0]._id}" class="list-group-item bg-transparent text-light"><p class="task-value">${result.addedTask[0].task}</p>      
        <div class='cont'>
          <div class="dropdown">
            <img class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsUlEQVR4nO2Zu07DMBhGvTBQJoSEuKxAJQQTjCzM5XVaHqBMMLHxCvAMTaWKGRiYuIitXMRCKQNMBxn+IjeEtFFrOxE+Uoe0sX0+X5LKVqoAAMtAC+gAJ8C0KgrACtCmnwtgRuUdoAzci3RDwlzJ9VmuR4Jv+bYhX5LvF4wQx6pI8rHfNS8qDWAHiIA3/NBIkC+Jk6aZJr/nSXpYeT1CS2k9r3kHqsC8cr9gSwPky2mVNeXGqm3xsctLga7cPKfcPudbwFSCvA6leQRWh6n0C5vi1uRdBYhNmwiYHGnaeAig/w70uARmxyLvIgCwLk08i/xPiJHlHQXovWOORNoM0RxJ3lGAG2liW67NEL/kgVP9yUUAYFOq1wt4AtgCDoGnv542mX0sBzgwevmBfs6Tpk3eAtzFpK+BOrA2Nh/LAfQivQX2gQ0rPrYXcVYIATxDCOAZQgDPEAJ4hhDAM4QAniEE8AwhgGf4jwFepYz1bfVBAIvi0slSqLczVlOeAXbFJcpSqGIccNT0wZpVywTkME/Lf4hLRWVBtjryQj2TfGwkIuPAwyVdaTtbzwcCAVUoPgEGo4/YLtUoJgAAAABJRU5ErkJggg==" height="20" width="20" class="edit-img" alt="create-new">
            <ul class="dropdown-menu dropdown-menu-end" style="padding: 30%">
              <input id="editInput-${result.addedTask[0]._id}" type="text" style="width: 75% !important; display: inline;" class="dropdown-item-secondary form-control" placeholder="Edit your task">
              <button onclick="editTask('${result.addedTask[0]._id}')" class="btn btn-primary" style="width: 20%; margin-left: 3%; float: right !important;" id="saveBtn">Save</button>
            </ul>
          </div>
          
          <div class="delete-btn">
            <img onclick="removeTask('${result.addedTask[0]._id}')" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEAklEQVR4nO2aSWxNURjHXwlCmzShZjEUUUptDIlaqIUhqAWJmjZIKGoICyppJWYqpg2KIoaFsUhZqMSQKBKlqIUxrZlEaSsh9C+X/5OXl+87r3d43Cb+STf3d7/vnP/pued857SBgEcC0BTABgCvEFkvAayzYgJ+E4D1sK+1Ab8Jv0fZ0pB6vJsa/M0E/CZQ0XrflQC0AXAKQC3+nWoBnLT64sbIFfhHl+12vjWAAwCq4D9VAdgPICGSiQQAL+B/VQJoZTKyFw1H+SYjH9Bw9N5kpAgNR0X1/Oz/yz8CcBj+1SE7RlbCv8q1Y2Qq/KspdowMVJLcBDCdG5KkrwDmsz7TZNVNWQC+KbyCbdxS+EA7RuKVJAvINyv8Pnl/g5EUvnNf4XnkCxUeX28jTPROSLKJbJ7SyGPyRIORbnznicLnkucJ7K0tE0x0TUh0gmy00onX5G0NRn6V4wDeKHwUuTUFw3XViZECIVEpWZLSic/kcQYjsXynWuG9yO8IbJ8TI9mGjjYD8EPg1rMY/tQJvC6Ea/HN2MYngS93YmSiMmK/zgKGlas5uXSqrCFrocRWhJyJJE1wYkRbeQZFOD0mGBaLtxE6epl8sGnFs2skVpkeGeTWSU1SV/KnAntC1k2JLSCfLLC64PflxIx0Wswmy1U6k0x+T2BlZH2V2BzyFQKrdGSCCS9pJzPuvqapVyKw6xGmzjTyPQIrdmNkl5YQwFClM2nkxQK7SDZciU01DOBON0aWCgmfkXVQOjOOvFBgp8nSldj25M8FtsSNEanB77ywjlGW2OBicERghw0f8xfmbMI2xAFyaqS3MnI9yMsFNpMsX2C7yWYJ7AFZT6XNJDdGmiqjM4L8nKFC3iqwLYbK9izZSG0WODZiqFLnkG03LM+rBbbKsLxuI8vUqmq3Ri4IiTeQLRbYGrLlAltGtlZgi8g2Cuy8F0Z2CImPkY0X2FayBQLLItsmsHSy4wLb7oURqUO3yVIMG+ZMgc0wbHj9yEq1AXBrZJSQuMpw7jhCliGwSWRHBRZHJv0VYKQXRrpDViulyi3k87FCzBiyM0pVnKC0leiFkca8HRFvM4SaKljCpAkxw5QSJFiDDRJirLYbuzbCBh4apkn4Dl5i6FTQ/A1lx88QYso9MaFMhT/HTmG/uMfnyUJMH+UqaJXheF3opZE8Q7kRvjo95fMuQkxnsmfKapavXUF5ZWS20MBdAI2se6iw5zW84JOm1gAy651QZTJXmRAz20sj0ocLniClheCjct1TTRauryH/cCCeb7wy0gn/Th29NBIjTIe/oVqrbc+MGEqHaKvUUxMu/vvHrXKiYaSd4XYxGnoEoKXnRmjG2husnVy7SfdCVu6Ddj/yn82TIp0pyam8AAAAAElFTkSuQmCC" height="20" width="20" class="bin-img" alt="waste">
          </div>
        </div>
      </li>`;
    addInput.value = "";
  } else {
    console.log("error adding the task: " + result.error);
    return;
  }
});

async function removeTask(deleteId) {
  const response = await fetch(`/deleteTask/${deleteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (result.success) {
    const liToRemove = document.querySelector(`li[data-id="${deleteId}"]`);
    liToRemove.remove();
  } else {
    console.log("error deleting the task: " + result.error);
  }
}
