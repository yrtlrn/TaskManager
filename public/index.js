const formDOM = document.querySelector('form');
const inputDOM = document.querySelector('input');
const allTaskDOM = document.querySelector('.allTasks');
const tasksDOM = document.querySelector(".tasks")

const createTask = async (e) => {
  e.preventDefault();
  try {
    await axios.post('/api/v1/', { data: inputDOM.value });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteTask = async (e) => {
  if (e.target.parentElement.classList.contains("deleteBtn") ) {
    await axios.delete("/api/v1/", {data: e.target.parentElement.id})
  } else {
    return
  }
  
  
}

const showAllTask = async () => {
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/');
    const newHtml = tasks.map((task) => {
      return `
      <div class="flex justify-between p-2">
        <h2>${task.name}</h2>
        <div>
          <a href="/tasks/${task._id}">
            <i class="fa-solid fa-pen-to-square mr-5"></i>
          </a>
          <button class="deleteBtn" id="${task._id}">
          <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
    });
    allTaskDOM.innerHTML = newHtml;
  } catch (error) {
    console.log(error.message);
  }
};


showAllTask();



formDOM.addEventListener('submit', createTask);
tasksDOM.addEventListener("click", deleteTask)

