const addAssignments = document.querySelector('#add');
const assignmentsList = document.querySelector('#assignments');
var assignments = JSON.parse(localStorage.getItem('assignments')) || [];

addAssignments.addEventListener('submit', addAssignment);
assignmentsList.addEventListener('click', toggleDone);

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
            <input type="text" data-index=${i} id="name">
            <input type="text" data-index=${i} id="weight">
            <input type="text" data-index=${i} id="mark">
            <button id="delete" data-index=${i} class="foo-button mdc-button">✕</button>
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

populateList(assignments, assignmentsList);
