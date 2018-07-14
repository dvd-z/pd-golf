const addAssignments = document.querySelector("#add");
const assignmentsList = document.querySelector("#assignments");
var assignments = JSON.parse(localStorage.getItem("assignments")) || [];

addAssignments.addEventListener("click", addAssignment);
assignmentsList.addEventListener("click", deleteItem);
assignmentsList.addEventListener("input", modifyItem);

function addAssignment() {
    const assignment = {
        name: "test",
        weight: 0,
        mark: 0
    };
    assignments.push(assignment);
    populateList(assignments, assignmentsList);
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function modifyItem(e) {
    if (!e.target.matches("input") || e.target.matches("input#delete")) {
        return;
    }
    const index = e.target.dataset.index;
    assignments[index][e.target.id] = e.target.value;
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function deleteItem(e) {
    if (!e.target.matches("input#delete")) {
        return;
    }
    assignments.splice(e.target.dataset.index, 1);
    populateList(assignments, assignmentsList);
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function populateList(assignments = [], assignmentsList) {
    assignmentsList.innerHTML = assignments.map((assignment, i) => {
        return `
            <li>
                <input type="text" data-index=${i} id="name" value=${assignments[`${i}`].name}>
                <input type="text" data-index=${i} id="weight" value=${assignments[`${i}`].weight}>
                <input type="text" data-index=${i} id="mark" value=${assignments[`${i}`].mark}>
                <input type="submit" id="delete" data-index=${i} class="foo-button mdc-button" value="✕">
            </li>
        `;
    }).join("");
}

populateList(assignments, assignmentsList);
