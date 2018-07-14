document.addEventListener('DOMContentLoaded', function () {
    const addAssignments = document.querySelector('#add');
    const assignmentsList = document.querySelector('#assignments');
    var assignments = JSON.parse(localStorage.getItem('assignments')) || [];

    addAssignments.addEventListener('click', addAssignment);

    function addAssignment(e) {
        e.preventDefault();
        const assignment = {};
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

    populateList(assignments, assignmentsList);

});
