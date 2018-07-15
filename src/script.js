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
    console.log(e.target.parentNode.parentNode.parentNode.dataset.index);
    assignments[e.target.parentNode.parentNode.parentNode.dataset.index][e.target.id] = e.target.value;
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function deleteItem(e) {
    if (e.target.id !== "delete") {
        return;
    }
    assignments.splice(e.target.parentNode.parentNode.parentNode.dataset.index, 1);
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
            <li class="list-group-item" data-index=${i}>
                <form class="form-inline">
                    <div class="form-group bmd-form-group">
                        <input type="text" class="form-control" id="name">
                        <label for="name" class="bmd-label-static">Assignment Name</label>
                    </div>
                    <div class="form-group bmd-form-group">
                        <input type="text" class="form-control" id="weight">
                        <label for="weight" class="bmd-label-static">Weight</label>
                    </div>
                    <div class="form-group bmd-form-group">
                        <input type="text" class="form-control" id="mark">
                        <label for="mark" class="bmd-label-static">Mark</label>
                    </div>
                    <input type="button" id="delete" value="&times;">
                </form>
            </li>
         `;
    }).join("");
}

populateList(assignments, assignmentsList);
