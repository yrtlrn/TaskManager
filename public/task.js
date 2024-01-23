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
    console.log('Task not found - frontend');
  } catch (error) {
    console.log(error.message);
  }
};

setId(id);
setTaskData(id);

const editTask = async (e) => {
  e.preventDefault();
  const newTask = taskDOM.value;
  const checkBoxStatus = checkboxDOM.checked;
  try {
    await axios.patch(`/api/v1/${id}`, { data: { newTask, checkBoxStatus } });
    Toastify({ text: 'Task Edited', duration: 3000 }).showToast();
    return;
  } catch (error) {
    console.log(error.message);
  }
};

formDOM.addEventListener('submit', editTask);
