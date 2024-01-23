const formDOM = document.querySelector('form');
const inputDOM = document.querySelector('input');
const allTaskDOM = document.querySelector('.allTasks');
let newHtml = '';
const showAllTask = async () => {
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/');
    if (tasks.length < 1) {
      newHtml = '<h1 class="text-center text-2xl ">List is empty...</h1>';
    } else {
      newHtml = tasks
        .map((task) => {
          return `
        <div class="flex mb-5 justify-between bg-white rounded-lg p-2 ">
          <h2 class="${task.completed && 'line-through'}">${task.name}</h2>
          <div class="text-red-800">
            <a href="task.html?id=${task._id}">
              <i class="fa-solid fa-pen-to-square mr-5"></i>
            </a>
            <button class="deleteBtn" id="${task._id}">
            <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>`;
        })
        .join('');
    }
    allTaskDOM.innerHTML = newHtml;
  } catch (error) {
    console.log(error.message);
    Toastify({
      text: 'Something went wrong... Try Again',
      duration: 3000,
    }).showToast();
  }
};

const createTask = async (e) => {
  e.preventDefault();
  try {
    await axios.post('/api/v1/', { data: inputDOM.value });
    showAllTask();
    inputDOM.value = '';
    return;
  } catch (error) {
    console.log(error.message);
    Toastify({
      text: 'Something went wrong... Try Again',
      duration: 3000,
    }).showToast();
  }
};

const deleteTask = async (e) => {
  if (e.target.parentElement.classList.contains('deleteBtn')) {
    const id = e.target.parentElement.id;
    try {
      await axios.delete(`/api/v1/${id}`);
      showAllTask();
      return;
    } catch (error) {
      console.log(error.message);
      Toastify({
        text: 'Something went wrong... Try Again',
        duration: 3000,
      }).showToast();
    }
  } else {
    return;
  }
};

showAllTask();

formDOM.addEventListener('submit', createTask);
allTaskDOM.addEventListener('click', deleteTask);
