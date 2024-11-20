function showTaskForm() {
    var form = document.getElementById("taskForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function filterTasks(filter) {
    alert(`Filtering tasks by: ${filter}`);
}

function addTask() {
    var taskName = document.getElementById("taskName").value;
    var taskPriority = document.getElementById("taskPriority").value;

    if (taskName && taskPriority) {
        // Create object of the task
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
                console.error('Chyba: Úkol není vrácen zpět.');
            } else {
                console.log('Úkol byl přidán:', task);

                // Přidání úkolu na stránku
                var taskList = document.getElementById("taskList");
                var taskItem = document.createElement("li");
                taskItem.classList.add("list-group-item");

                // Opraveno: Použití `title` místo `name`
                taskItem.textContent = `${task.title} - ${task.priority}`;
                taskList.appendChild(taskItem);

                // Vyprázdnit formulář
                document.getElementById("taskName").value = '';
                document.getElementById("taskPriority").value = 'HIGH';

                // Skrýt formulář
                showTaskForm();

                // Načíst všechny úkoly znovu a aktualizovat seznam
                loadTasks();
            }
        })
        .catch(error => {
            console.error('Chyba při přidávání úkolu:', error);
        });
    }
}

// Načítání všech úkolů
function loadTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            var taskList = document.getElementById("taskList");
            taskList.innerHTML = ''; // Vyčistí předchozí seznam úkolů

            tasks.forEach(task => {
                var taskItem = document.createElement("li");
                taskItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

                // Create the checkbox
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.completed;
                checkbox.addEventListener("click", function () {
                    toggleTaskCompletion(task.id, checkbox);
                });

                // Create task title with priority
                var taskTitle = document.createElement("span");
                taskTitle.textContent = `${task.title} - ${task.priority}`;

                if (task.completed) {
                    taskTitle.classList.add("completed-task");
                }

                // Create delete button (křížek)
                var deleteButton = document.createElement("button");
                deleteButton.textContent = "❌"; // Symbol křížku
                deleteButton.classList.add("btn", "btn-danger", "btn-sm");
                deleteButton.style.marginLeft = "10px";
                deleteButton.addEventListener("click", function () {
                    deleteTask(task.id);
                });

                // Add checkbox, title, and delete button to the task item
                var taskContent = document.createElement("div");
                taskContent.appendChild(checkbox);
                taskContent.appendChild(taskTitle);
                taskItem.appendChild(taskContent);
                taskItem.appendChild(deleteButton);

                // Add task item to the list
                taskList.appendChild(taskItem);
            });
        })
        .catch(error => {
            console.error('Chyba při načítání úkolů:', error);
        });
}

// Mazání úkolu
function deleteTask(taskId) {
    // Potvrzení od uživatele
    if (!confirm("Opravdu chcete tento úkol smazat?")) return;

    // Pošle DELETE požadavek na backend
    fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
    })
        .then(() => {
            console.log(`Úkol s ID ${taskId} byl smazán.`);
            loadTasks(); // Znovu načte seznam úkolů
        })
        .catch(error => {
            console.error('Chyba při mazání úkolu:', error);
        });
}


// Toggle task completion
function toggleTaskCompletion(taskId, checkbox) {
    // Send request to backend to toggle completion
    fetch(`/api/tasks/${taskId}/toggle`, {
        method: 'PATCH'
    })
    .then(response => response.json())
    .then(updatedTask => {
        // Update the task item on the UI immediately
        var taskItem = checkbox.closest("li"); // Get the <li> element of the task
        var taskTitle = taskItem.querySelector("span"); // Get the task title

        // If task is completed, add the 'completed-task' class to strike-through the text
        if (updatedTask.completed) {
            taskTitle.classList.add("completed-task");
        } else {
            taskTitle.classList.remove("completed-task");
        }

        // Also update the checkbox state (it should already be updated automatically by the browser, but we can make sure)
        checkbox.checked = updatedTask.completed;
    })
    .catch(error => {
        console.error('Chyba při změně stavu úkolu:', error);
    });
}


// Načítání úkolů při načtení stránky
window.onload = loadTasks;
