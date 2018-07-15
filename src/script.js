const addAssignments = document.querySelector("#add");
const assignmentsList = document.querySelector("#assignments");
const calculate = document.querySelector("#calculate");
var assignments = JSON.parse(localStorage.getItem("assignments")) || [];

addAssignments.addEventListener("click", addAssignment);
assignmentsList.addEventListener("click", deleteItem);
assignmentsList.addEventListener("input", modifyItem);
calculate.addEventListener("click", calculateMarks);

function addAssignment() {
    const assignment = {
        name: "Assignment",
        weight: "",
        mark: ""
    };
    assignments.push(assignment);
    populateList(assignments, assignmentsList);
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function modifyItem(e) {
    if (!e.target.matches("input") || e.target.matches("button#delete")) {
        return;
    }
    assignments[e.target.dataset.index][e.target.id] = e.target.value;
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function deleteItem(e) {
    if (e.target.id !== "delete-button") {
        return;
    }
    assignments.splice(e.target.dataset.index, 1);
    populateList(assignments, assignmentsList);
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function calculateMarks() {

    //const desiredMark = input value;
    var totalWeightAchieved = 0, neededWeight = 0;
    assignments.forEach(assignment => {
        if (assignment.mark) {
            totalWeightAchieved += (assignment.mark / 100) * assignment.weight;
            neededWeight -= desiredMark - (assignment.mark / 100) * assignment.weight;
            neededWeight /= 3;
        }
    });

    assignments.forEach(assignment => {
        if (!assignment.mark) {
            assignment.mark = (neededWeight / weight) * 100;
        }
    });

}

function populateList(assignments = [], assignmentsList) {
    assignmentsList.innerHTML = assignments.map((assignment, i) => {
        return `
            <li class="list-group-item">
                <form class="form-inline">
                    <div class="form-group bmd-form-group">
                        <input type="text" data-index=${i} class="form-control" id="name" value=${assignments[`${i}`].name}>
                        <label for="name" class="bmd-label-static">Assignment Name</label>
                    </div>
                    <div class="form-group bmd-form-group">
                        <input type="text" data-index=${i} class="form-control" id="weight" value=${assignments[`${i}`].weight}>
                        <label for="weight" class="bmd-label-static">Weight</label>
                    </div>
                    <div class="form-group bmd-form-group">
                        <input type="text" data-index=${i} class="form-control" id="mark" value=${assignments[`${i}`].mark}> 
                        <label for="mark" class="bmd-label-static">Mark</label>
                    </div>
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true" id="delete-button">
                            &times;
                        </span>
                    </button>
                </form>
            </li>
         `;
    }).join("");
}

populateList(assignments, assignmentsList);
