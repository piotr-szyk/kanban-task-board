// 02-Challenge: Task Board (Unsolved Starter)
//
// Use this file to implement:
// - Task creation
// - Task rendering
// - Drag-and-drop across columns
// - Color-coding by due date using Day.js
// - Persistence with localStorage

// ===== State & Initialization =====

// Load tasks and nextId from localStorage (or use defaults)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let nextId = JSON.parse(localStorage.getItem('nextId')) || 1;

// Utility to save tasks + nextId
function saveState() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('nextId', JSON.stringify(nextId));
}

// ===== Core Functions (implement these) =====

// TODO: generateTaskId()
// - Return a unique id
// - Increment nextId and persist using saveState()
function generateTaskId() {
    // Your code here
    const id = nextId;
    nextId++;
    saveState();
    return id;
}

// TODO: createTaskCard(task)
// - Return a jQuery element representing a task card
// - Include:
//   - Title
//   - Description
//   - Due date
//   - Delete button
// - Add a data-task-id attribute for later lookups
// - Use Day.js to color-code:
//   - If task is not in "done":
//     - Add a warning style if due soon / today
//     - Add an overdue style if past due
function createTaskCard(task) {
    // Your code here
    const card = $('<div>')
        .addClass('card task-card mb-3')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h5').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDesc = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete-task')
        .text('Delete')
        .attr('data-task-id', task.id);

    // Color-coding logic using Day.js
    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDate = dayjs(task.dueDate, 'YYYY-MM-DD');

        if (now.isSame(taskDate, 'day')) {
            card.addClass('task-due-warning'); // Due today
        } else if (now.isAfter(taskDate)) {
            card.addClass('task-due-overdue'); // Past due
        }
    }

    // Assemble the card
    cardDeleteBtn.on('click', handleDeleteTask);
    cardBody.append(cardDesc, cardDueDate, cardDeleteBtn);
    card.append(cardHeader, cardBody);

    return card;

}

// TODO: renderTaskList()
// - Clear all lane containers (#todo-cards, #in-progress-cards, #done-cards)
// - Loop through tasks array
// - For each task, create a card and append it to the correct lane
// - After rendering, make task cards draggable with jQuery UI
function renderTaskList() {
    // Your code here
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    // Loop and append to correct lanes
    tasks.forEach((task) => {
        const card = createTaskCard(task);
        if (task.status === 'to-do') {
            $('#todo-cards').append(card);
        } else if (task.status === 'in-progress') {
            $('#in-progress-cards').append(card);
        } else if (task.status === 'done') {
            $('#done-cards').append(card);
        }
    });

    // Make cards draggable
    $('.task-card').draggable({
        opacity: 0.7,
        zIndex: 100,
        // Helper creates a clone while dragging to keep the layout stable
        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable') 
                ? $(e.target) 
                : $(e.target).closest('.ui-draggable');
            return original.clone().css({ width: original.outerWidth() });
        },
    });
}

// TODO: handleAddTask(event)
// - Prevent default form submission
// - Read values from #taskTitle, #taskDescription, #taskDueDate
// - Validate: if missing, you can show a message or just return
// - Create a new task object with:
//   - id from generateTaskId()
//   - title, description, dueDate
//   - status: 'to-do'
// - Push to tasks array, save, re-render
// - Reset the form and close the modal
function handleAddTask(event) {
    // Your code here
    event.preventDefault();

    const taskTitle = $('#taskTitle').val();
    const taskDueDate = $('#taskDueDate').val();
    const taskDescription = $('#taskDescription').val();

    if (!taskTitle || !taskDueDate) return; // Basic validation

    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription,
        status: 'to-do',
    };

    tasks.push(newTask);
    saveState();
    renderTaskList();

    // Clear form and hide modal
    $('#taskForm')[0].reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    modal.hide();
}

// TODO: handleDeleteTask(event)
// - Get the task id from the clicked button (data-task-id)
// - Remove that task from tasks array
// - Save and re-render
function handleDeleteTask(event) {
    // Your code here
    const taskId = $(this).attr('data-task-id');
    tasks = tasks.filter((t) => t.id !== parseInt(taskId));
    saveState();
    renderTaskList();
}

// TODO: handleDrop(event, ui)
// - Get the task id from the dragged card
// - Determine the new status from the lane's dataset/status or id
// - Update the task's status in the tasks array
// - Save and re-render
function handleDrop(event, ui) {
    // Your code here
    const taskId = ui.draggable.attr('data-task-id');
    const newStatus = $(event.target).closest('.lane').attr('data-status');

    // Update the status in the array
    tasks.forEach((t) => {
        if (t.id === parseInt(taskId)) {
            t.status = newStatus;
        }
    });

    saveState();
    renderTaskList();
}

// ===== Document Ready =====

$(function () {
    // Show current date in header using Day.js
    $('#current-date').text(dayjs().format('[Today:] dddd, MMM D, YYYY'));

    // Initialize datepicker for due date
    // Hint: keep format consistent and use it in your parsing
    $('#taskDueDate').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: 0,
    });

    // Render tasks on load (will do nothing until you implement renderTaskList)
    renderTaskList();

    // Form submit handler
    $('#taskForm').on('submit', handleAddTask);

    // Make lanes droppable
    // TODO: configure droppable to accept task cards and use handleDrop
    $('.lane-body').droppable({
        accept: '.task-card',
        drop: handleDrop,
    });
});

// NOTE:
// - You are encouraged to use Day.js for ALL date logic.
// - You may adjust “due soon” rules, as long as they’re clearly implemented.