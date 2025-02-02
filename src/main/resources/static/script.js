function showTaskForm() {
    var form = document.getElementById("taskForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function addTask() {
    var taskName = document.getElementById("taskName").value;
    var taskPriority = document.getElementById("taskPriority").value;

    if (taskName && taskPriority) {
        // Create an object of the task
        var newTask = {
            title: taskName,
            priority: taskPriority,
            completed: false
        };
        // Sending a request to the backend (POST)
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(response => response.json())
        .then(task => {
            if (!task) {
                console.error('Error: A task was not added.');
            } else {
                console.log('A task was added:', task);

                // Add Task
                var taskList = document.getElementById("taskList");
                var taskItem = document.createElement("li");
                taskItem.classList.add("list-group-item");

                taskItem.textContent = `${task.title} - ${task.priority}`;
                taskList.appendChild(taskItem);

                // Empty form
                document.getElementById("taskName").value = '';
                document.getElementById("taskPriority").value = 'HIGH';

                // Hide Form
                showTaskForm();

                // Load all tasks
                loadTasks();
            }
        })
        .catch(error => {
            console.error('Error during adding:', error);
        });
    }
}
// Delete Task
function deleteTask(taskId) {
    // Confirm from the user
    if (!confirm("Do you really want to delete the task ?")) return;

    // Sent DELETE request on the backend
    fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
    })
        .then(() => {
            console.log(`Task ID ${taskId} was deleted.`);
            loadTasks();
        })
        .catch(error => {
            console.error('Error during deleting :', error);
        });
}
// Current filter
let currentFilter = 'ALL';

function filterTasks(filter) {
    currentFilter = filter;
    document.querySelectorAll('.priority-bg').forEach(div => {
        div.classList.remove('active');
    });

    const activeDiv = {
        'ALL': document.querySelector('.all-tasks'),
        'HIGH': document.querySelector('.high-priority'),
        'MEDIUM': document.querySelector('.medium-priority'),
        'LOW': document.querySelector('.low-priority'),
    }[filter];
    if (activeDiv) activeDiv.classList.add('active');

    // Load tasks
    loadTasks();
}
function toggleTaskCompletion(taskId, checkbox) {
    fetch(`/api/tasks/${taskId}/toggle`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                const taskTitle = checkbox.parentElement.querySelector('span');
                if (checkbox.checked) {
                    taskTitle.classList.add('completed-task');
                } else {
                    taskTitle.classList.remove('completed-task');
                }
            } else {
                console.error('Error during the update of the task.');
                checkbox.checked = !checkbox.checked; // Vrátí checkbox do původního stavu
            }
        })
        .catch(error => {
            console.error('Error during the update of the task.', error);
            checkbox.checked = !checkbox.checked;
        });
}
function updateCounts(tasks) {
    const allCount = tasks.length;
    const highCount = tasks.filter(task => task.priority === 'HIGH').length;
    const mediumCount = tasks.filter(task => task.priority === 'MEDIUM').length;
    const lowCount = tasks.filter(task => task.priority === 'LOW').length;

    document.getElementById('AllCount').textContent = allCount;
    document.getElementById('highCount').textContent = highCount;
    document.getElementById('mediumCount').textContent = mediumCount;
    document.getElementById('lowCount').textContent = lowCount;
}
function loadTasks() {
    let url = '/api/tasks';
    if (currentFilter !== 'ALL') {
        url += `/priority/${currentFilter}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(tasks => {

            updateCounts(tasks);

            // Delete and fill the list
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('click', () => toggleTaskCompletion(task.id, checkbox));

                const taskTitle = document.createElement('span');
                taskTitle.textContent = `${task.title} - ${task.priority}`;
                if (task.completed) taskTitle.classList.add('completed-task');

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';
                deleteButton.classList.add('delete-btn');
                deleteButton.addEventListener('click', () => deleteTask(task.id));

                const taskContent = document.createElement('div');
                taskContent.appendChild(checkbox);
                taskContent.appendChild(taskTitle);

                taskItem.appendChild(taskContent);
                taskItem.appendChild(deleteButton);
                taskList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Error: tasks are not updated', error));
}
// Reload tasks (refresh the page)
window.onload = () => filterTasks('ALL');
