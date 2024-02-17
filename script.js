//* Dichiarare nodi dal DOM:

//Endpoint:
const endpoint = "https://jsonplaceholder.typicode.com/users";

//la tabella da compilare nel DOM:
let tableDom = document.getElementById("table");

// dropdown menu search value:
let dropdownMenu = document.getElementById("dropdown-filter-menu");


// Make a copy of UsersData for showing tha filtered data:
let filteredUsersData = [];


//* Chiamata HTTP
// endpoint: https://jsonplaceholder.typicode.com/users

async function callData() {
    try {
        const response = await fetch(endpoint);
        const UsersData = await response.json();
        filteredUsersData = [...UsersData];
        creatTable(UsersData);
    } catch (err) {
        console.log(err)
    }
};
callData();



//* Create the table in the DOM:
function creatTable(arrayUsers) {
    let tableBody = document.createElement("tbody");
    tableBody.id = "table-body";
    tableDom.appendChild(tableBody);

    // row number in the table
    let i = 1;

    arrayUsers.forEach(element => {
        let userRow = document.createElement("tr");
        userRow.innerHTML =
            `  <th scope="row">${i}</th>
            <td>${element.name}</td>
            <td>${element.username}</td>
            <td>${element.email}</td>
        `;
        tableBody.appendChild(userRow);
        i += 1;
    });
};



//* search function:
document.getElementById("search-btn").addEventListener("click", () => {
    // delete the body of the table:
    document.getElementById("table-body").remove();

    // call the search function:
    searchUser();
});

function searchUser() {
    // input text value:
    let searchValue = document.getElementById("input-text").value;

    let filterResult = filteredUsersData.filter(user => {
        return user[dropdownMenu.value].toLowerCase().includes(searchValue.toLowerCase());

    });

    creatTable(filterResult);
}