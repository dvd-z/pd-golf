const addAssignments = document.querySelector('#add');
const assignmentsList = document.querySelector('#assignments');
// const deleteButton = document.querySelector('#delete');
// const checkButton = document.querySelector('#check');
// const uncheckButton = document.querySelector('#uncheck');
var assignments = JSON.parse(localStorage.getItem('assignments')) || [];

addAssignments.addEventListener('submit', addAssignment);
assignmentsList.addEventListener('click', toggleDone);
// deleteButton.addEventListener('click', deleteAll);
// checkButton.addEventListener('click', checkAll);
// uncheckButton.addEventListener('click', uncheckAll);

function addAssignment(e) {
    e.preventDefault();
    const assignment = {
    text: (this.querySelector('[name=assignment]')).value,
    done: false
    }
    assignments.push(assignment);
    populateList(assignments, assignmentsList);
    localStorage.setItem('assignments', JSON.stringify(assignments));
    this.reset();
}

function populateList(assignments = [], assignmentsList) {
    assignmentsList.innerHTML = assignments.map((assignment, i) => {
    return `
        <li>
        <input type='checkbox' data-index=${i} id='assignment${i}' ${assignment.done ? 'checked' : ''}/>
        <label for='assignment${i}'>${assignment.text}</label>
        </li>
    `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) {
    return;
    }
    const index = e.target.dataset.index;
    assignments[index].done = !assignments[index].done;
    localStorage.setItem('assignments', JSON.stringify(assignments));
    populateList(assignments, assignmentsList);
}

// function deleteAll() {
//     assignments = [];
//     populateList([], assignmentsList);
//     localStorage.removeItem('assignments');
// }

// function checkAll() {
//     assignments.forEach(assignment => assignment.done = true);
//     populateList(assignments, assignmentsList);
//     localStorage.setItem('assignments', JSON.stringify(assignments));
// }

// function uncheckAll() {
//     assignments.forEach(assignment => assignment.done = false);
//     populateList(assignments, assignmentsList);
//     localStorage.setItem('assignments', JSON.stringify(assignments));
// }

populateList(assignments, assignmentsList);
