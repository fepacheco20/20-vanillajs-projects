// ********************
// SELECTOR
// ********************
const addUser = document.querySelector("#btn-add");
const doubleMoney = document.querySelector("#btn-double");
const showMillioners = document.querySelector("#btn-millionaires");
const sortRichest = document.querySelector("#btn-richest");
const showTotal = document.querySelector("#btn-total");
const display = document.querySelector("tbody");
const totalDisplay = document.querySelector("#total");

// ********************
// ARRAY OF USERS 
// ********************
const users = [];

// ********************
// ADD FIRST USERS 
// ********************
window.addEventListener('load', function () {
    // createUser(2);
})

// *************************
// GENERATE USER 
// *************************

// GENERATE NAME -- api: https://randomuser.me/
const getName = async () => {
    const name = await axios.get("https://randomuser.me/api/");
    const firstName = name.data.results[0].name["first"];
    const lastName = name.data.results[0].name["last"];
    return `${firstName} ${lastName}`
}

// GENERATE MONEY
const getMoney = () => {
    const money = Math.floor(Math.random() * 5000000) + 1;
    return money;
}

// ADD USER TO THE ARRAY 
const pushUser = (newName, newMoney) => {
    const newUser = {
        name: newName,
        money: newMoney
    }
    users.push(newUser);
}

// ADD USER TO HTML
const createUser = async (qty = 1) => {
    for (let i = 0; i < qty; i++) {
        const newName = await getName();
        const newMoney = getMoney();
        const tr = document.createElement("tr");
        const nameTd = document.createElement("td");
        const moneyTd = document.createElement("td");
        nameTd.append(newName);
        moneyTd.append(`R$ ${newMoney}`);
        tr.append(nameTd, moneyTd);
        display.append(tr);
        pushUser(newName, newMoney);
    }

}

// *************************
// UPDATING USER 
// *************************

// UPDATE THE ARRAY 
const updateArr = (arr, newInfo) => {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        arr[i].money = newInfo[i]
    }
}

// REMOVING USERS FROM HTML
const cleanDisplay = () => {
    const index = display.childElementCount
    for (let i = index - 1; i >= 0; i--) {
        display.children[i].remove();
    }
}

// ADDING ALL TO HTML
function updateDisplay(user) {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    const moneyTd = document.createElement("td");
    nameTd.append(user.name);
    moneyTd.append(`R$ ${user.money}`);
    tr.append(nameTd, moneyTd);
    display.append(tr);
}

// *************************
// EVENT LISTENER
// *************************

// ADDING NEW USER 
addUser.addEventListener("click", () => createUser());

// DOUBLE MONEY (MAP)
doubleMoney.addEventListener("click", function (e) {
    const newUsers = users.map(function (user) {
        return {
            ...user,
            money: user.money * 2
        }
    })

    users.splice(0, users.length);

    // for (let i = 0; i < newUsers.length; i++) {
    //     users.push(newUsers[i]);
    // }
    users.push(...newUsers);

    cleanDisplay();

    users.forEach(updateDisplay);
})

// SHOW ONLY MILIONERS (FILTER)
showMillioners.addEventListener("click", function (e) {
    const filtered = users.filter(function (user) {
        return user.money > 1000000
    });

    cleanDisplay();
    filtered.forEach(updateDisplay);
})

// FILTER BY RICHEST (SORT)
sortRichest.addEventListener("click", function (e) {
    function compararNumeros(a, b) {
        return b.money - a.money;
    }

    const sortList = users.sort(compararNumeros);

    cleanDisplay();

    sortList.forEach(updateDisplay);
})

// CALCULATE TOTAL (REDUCE)
showTotal.addEventListener("click", function (e) {

    const totalMoney = users.reduce((total, current) =>
        (total + current.money), 0);

    totalDisplay.innerText = `R$ ${totalMoney}`;

})



