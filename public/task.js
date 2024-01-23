const idDOM = document.querySelector('.id');
const taskDOM = document.querySelector('.task');
const checkboxDOM = document.querySelector('.checkbox');
const formDOM = document.querySelector('form');

const id = window.location.search.split('=')[1];

const setId = (id) => {
  idDOM.innerText = id;
};

const setTaskData = async (id) => {
  try {
    const { data: task } = await axios.get(`/api/v1/${id}`);

    if (task) {
      taskDOM.value = task.name;
      checkboxDOM.checked = task.completed;
      return;
    }
    return;
  } catch (error) {
    console.log(error.message);
    Toastify({
      text: 'Something went wrong... Try Again',
      duration: 3000,
    }).showToast();
  }
};

setId(id);
setTaskData(id);

const editTask = async (e) => {
  e.preventDefault();
  const newTask = taskDOM.value;
  const checkboxStatus = checkboxDOM.checked;
  try {
    if (newTask.length < 1) {
      Toastify({ text: 'Task cannot be empty', duration: 3000 }).showToast();
      return;
    }
    console.log(newTask, checkboxStatus);
    await axios.patch(`/api/v1/${id}`, { data: { newTask, checkboxStatus } });
    Toastify({ text: 'Task Edited', duration: 3000 }).showToast();
    return;
  } catch (error) {
    console.log(error.message);
    Toastify({
      text: 'Something went wrong... Try Again',
      duration: 3000,
    }).showToast();
  }
};

formDOM.addEventListener('submit', editTask);
