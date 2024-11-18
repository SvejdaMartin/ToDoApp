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

// Funkce pro načítání všech úkolů
function loadTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            var taskList = document.getElementById("taskList");
            taskList.innerHTML = ''; // Vyčistí předchozí seznam úkolů

            tasks.forEach(task => {
                var taskItem = document.createElement("li");
                taskItem.classList.add("list-group-item");
                taskItem.textContent = `${task.title} - ${task.priority}`;
                taskList.appendChild(taskItem);
            });
        })
        .catch(error => {
            console.error('Chyba při načítání úkolů:', error);
        });
}

// Načítání úkolů při načtení stránky
window.onload = loadTasks;
