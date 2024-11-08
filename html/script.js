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
        addUser(user);
        event.target.reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        for (const user of data)
            addUser(user);
    })
    .catch(error => {
        console.error('Could not fetch users:', error);
    });
});

function addUser(user) {
    let table = document.getElementById('userTable');
    let row = table.insertRow();
    row.insertCell().innerText = user.id;
    row.insertCell().innerText = user.name;
    row.insertCell().innerText = user.email;
}
