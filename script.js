let main = document.getElementById('main')
let user = document.getElementById('add')
let doubleMoney = document.getElementById('double')
let filter = document.getElementById('million')
let sort = document.getElementById('sort')
let calculateAll = document.getElementById('all')

let data = []

addUser()
addUser()
addUser()

// format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
function formatNumber (number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// adds new user and him wealth on the page
async function addUser () {
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json()
        user = data.results[0]
        const newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.ceil(Math.random() * 1000000)
        }
        // main.innerHTML += `<div class="person"> <strong>${newUser.name}</strong> $${formatNumber (newUser.money)}</div>`

        addData(newUser)
}


function addData(obj) {
    data.push(obj)

    updateDOM()
}

// multiplies all user's wealth by two
function double () {
    data = data.map(user => {
        return {...user , money: user.money * 2}
    })

    updateDOM()
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> $ ${formatNumber(item.money)}`;
    main.appendChild(element)
    });
}


user.addEventListener('click', addUser)
doubleMoney.addEventListener('click', double)