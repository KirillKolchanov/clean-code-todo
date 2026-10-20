const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createCheckbox = function () {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  return checkbox;
};

const createLabel = function (taskText) {
  const label = document.createElement('label');
  // innerText, not innerHTML: the task text must not be parsed as markup.
  label.innerText = taskText;
  label.className = 'task';
  return label;
};

const createEditInput = function () {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  return editInput;
};

const createEditButton = function () {
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';

  const deleteIcon = document.createElement('img');
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  return deleteButton;
};

const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');
  listItem.append(
    createCheckbox(),
    createLabel(taskText),
    createEditInput(),
    createEditButton(),
    createDeleteButton(),
  );
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createTaskElement(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const toggleTaskCompletion = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(listItem);
};

addButton.onclick = addTask;

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskCompletion;
};

for (const taskListItem of [...todoList.children, ...completedList.children]) {
  bindTaskEvents(taskListItem);
}
