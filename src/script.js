const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
// const deleteButton = document.querySelector('#delete');
// const checkButton = document.querySelector('#check');
// const uncheckButton = document.querySelector('#uncheck');
var items = JSON.parse(localStorage.getItem('items')) || [];

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
// deleteButton.addEventListener('click', deleteAll);
// checkButton.addEventListener('click', checkAll);
// uncheckButton.addEventListener('click', uncheckAll);

function addItem(e) {
    e.preventDefault();
    const item = {
    text: (this.querySelector('[name=item]')).value,
    done: false
    }
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(items = [], itemsList) {
    itemsList.innerHTML = items.map((item, i) => {
    return `
        <li>
        <input type='checkbox' data-index=${i} id='item${i}' ${item.done ? 'checked' : ''}/>
        <label for='item${i}'>${item.text}</label>
        </li>
    `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) {
    return;
    }
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

// function deleteAll() {
//     items = [];
//     populateList([], itemsList);
//     localStorage.removeItem('items');
// }

// function checkAll() {
//     items.forEach(item => item.done = true);
//     populateList(items, itemsList);
//     localStorage.setItem('items', JSON.stringify(items));
// }

// function uncheckAll() {
//     items.forEach(item => item.done = false);
//     populateList(items, itemsList);
//     localStorage.setItem('items', JSON.stringify(items));
// }

populateList(items, itemsList);
