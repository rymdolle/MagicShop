// Callback event when submitting user creation
document.forms.user.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch(event.target.action, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(user => {
        console.log('Submission success', user);
        addUserToDropdown(user);
        event.target.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        setPageError(error);
    });
});

// Callback event when submitting shop order
document.forms.order.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        items: [],
        user: document.getElementById('userList').value,
    };

    formData.forEach((value, key) => {
        const count = parseInt(value);
        if (count > 0) {
            data.items.push({
                name: key,
                quantity: count,
            });
        }
    });

    if (data.items.length === 0) {
        setPageError('You have to select something to order');
        return;
    }

    console.log(data);
    fetch(event.target.action, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(order => {
        console.log('Submission success', order);
        document.forms.order.reset();
        setPageError(JSON.stringify(order));
    })
    .catch(error => {
        console.error('Error:', error);
        setPageError(error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Populate user dropdown
    fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        for (const user of data)
            addUserToDropdown(user);
    })
    .catch(error => {
        console.error('Could not fetch users:', error);
    });

    // Fill table of available items
    fetch('/api/items')
    .then(response => response.json())
    .then(data => {
        let table = document.getElementById('itemTable');
        for (const item of data) {
            let row = table.insertRow();
            let quantityInput = document.createElement('input');
            quantityInput.setAttribute('type', 'number');
            quantityInput.setAttribute('name', item.name);
            quantityInput.setAttribute('min', 0);
            quantityInput.setAttribute('value', 0);
            row.insertCell().appendChild(quantityInput);
            row.insertCell().innerText = item.name;
            row.insertCell().innerText = item.description;
            row.insertCell().innerText = item.price.toFixed(2);
        }
    })
    .catch(error => {
        console.error('Could not fetch users:', error);
    });
});

function addUserToDropdown(user) {
    const userList = document.getElementById('userList');
    let option = document.createElement('option');
    option.value = user.email;
    option.innerText = `${user.name} <${user.email}>`;
    userList.appendChild(option);
}

function setPageError(error) {
    const now = new Date();
    document.getElementById('error').innerText = `${now.toISOString()}  ${error}`;
}