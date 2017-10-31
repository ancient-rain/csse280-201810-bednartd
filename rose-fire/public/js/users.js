(() => {
    "use strict";

    function getAndDisplayUsers() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        if (!token) {
            alert("Unauthorized access to this page.  Must authenticate first.");
            window.location.href = 'index.html';
        } 
        $.ajax({
            url: 'http://localhost:9999/api/users',
            type: 'GET',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', `bearer ${token}`);
            },
            dataType: 'JSON',
            success: (data) => { displayData(data);},
            error: (xhr, status, err) => { displayErrors(xhr, status, err); }
        });
    }

    function displayData(data) {
        const container = $('#users').empty();
        const tableEl = $('<table>');
        const tableHead = $('<tr>');
        tableHead.append(`<th>First Name</th>`);
        tableHead.append(`<th>Last Name</th>`);
        tableHead.append(`<th>Email</th>`);
        tableHead.append(`<th>Username</th>`);
        tableHead.append(`<th>Is Admin </th>`);
        tableEl.append(tableHead);
        data.forEach((element) => {
            const trEl = $('<tr>');
            trEl.append(`<td>${element.firstName} </td>`);
            trEl.append(`<td>${element.lastName} </td>`);
            trEl.append(`<td>${element.email} </td>`);
            trEl.append(`<td>${element.username} </td>`);
            trEl.append(`<td>${element.admin} </td>`);
            tableEl.append(trEl);
        });
        container.append(tableEl);
    }

    function displayErrors(xhr, status, err) {
        const container = $('#users').empty();
        container.append(`<h2>Status Code ${xhr.status} </h2>`);
        container.append(`<h3>Error: </h3>`);
        container.append(`<p>${status} ${err} </p>`);
    }
    
    $(document).ready( () => {
        getAndDisplayUsers();
    });
})();