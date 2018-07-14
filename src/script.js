const addAssignments = document.querySelector("#add");
const assignmentsList = document.querySelector("#assignments");
var assignments = JSON.parse(localStorage.getItem("assignments")) || [];

addAssignments.addEventListener("click", addAssignment);
assignmentsList.addEventListener('click', deleteItem);

function addAssignment(e) {
    const assignment = {};
    assignments.push(assignment);
    populateList(assignments, assignmentsList);
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function deleteItem(e) {
    if (!e.target.matches("input#delete")) {
        return;
    }
    assignments.splice(e.target.dataset.index, 1);
    populateList(assignments, assignmentsList);
    localStorage.setItem('assignments', JSON.stringify(assignments));
}

function populateList(assignments = [], assignmentsList) {
    assignmentsList.innerHTML = assignments.map((assignment, i) => {
        return `
            <li>
                <input type="text" data-index=${i} id="name">
                <input type="text" data-index=${i} id="weight">
                <input type="text" data-index=${i} id="mark">
                <input type="submit" id="delete" data-index=${i} class="foo-button mdc-button" value="✕">
            </li>
        `;
    }).join("");
}

populateList(assignments, assignmentsList);
