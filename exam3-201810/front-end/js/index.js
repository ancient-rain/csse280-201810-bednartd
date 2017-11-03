(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/api/shows/";

    let showsTable;
    let shows = [];

    // make ajax call to get all the shows from api
    function getShows() {
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    shows = data;
                    displayShows(shows);
                    console.log(shows);
                } else {
                    alert("Broadway shows were not Found.");
                }
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
                alert(error, status, request);
            }
        });
    }

    // save show-to-update in browser storage and go to shows page
    function saveShowIdNavigate(show) {
        let error = false;
        try {
            const showToUpdateString = JSON.stringify(show._id);
            sessionStorage.setItem("broadwayShow", showToUpdateString);
        } catch (e) {
            alert(`Error when writing to Session Storage ${e}`);
            error = true;
        }
        if (!error) {
            window.location.href = "show.html";
        }
    }

    // dynamically display all the shows from api
    function displayShows(shows) {
        shows.sort();
        let count = 0;
        showsTable = $("table#all-broadway-shows").empty();
        showsTable.append(
            `<tr class="head">
                <th>Show</th>
                <th>Location</th>
                <th>Start</th>
                <th>End</th>
            </tr>`
        );
        shows.forEach( (show) => {
            count++;
            const $row = $('<tr>').attr('data-contact-id', show._id);
            if (count % 2 === 1) {
                $row.addClass('even');
            }
            $row.append(
                `<th> ${(show.name || "")} </th>` +
                `<td> ${(show.location || "")} </td>` +
                `<td> ${(window.displayTimeShortNames(new Date(show.start)) || "")}, ${(window.displayTimeAmPm(new Date(show.start)) || "")} </td>` +
                `<td> ${(window.displayTimeShortNames(new Date(show.end)) || "")}, ${(window.displayTimeAmPm(new Date(show.end)) || "")} </td>` 
            );
            // append row with show details to DOM tree
            showsTable.append($row);

            // Save contact to update in local storage
            $row.click( () => {
                saveShowIdNavigate(show);
            });
        });
    }

    function registerMember() {
        const member = {
            name: $('#name').val(),
            email: $('#email').val(),
            note: $('#interest').val()
        };
        const whichShow = {
            name: $('#show').val(),
            location: $('#location').val()
        };

        const thisShow = shows.find( (show) => {
            return show.name === whichShow.name && show.location === whichShow.location;
        });

        if (!(thisShow && thisShow._id)) {
            alert('Selected show is not saved on the back-end.');
            return;
        }
        $.ajax({
            url: `${apiUrl}${thisShow._id}/members`,
            type: 'POST',
            data: member,
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    saveShowIdNavigate(thisShow);
                } else {
                    alert("Could not add member entry to show in the back-end");
                }
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
                alert(error, status, request);
            }
        });
    }

    $(document).ready( () => {
        $("#register").hide();
        getShows();
        $("#register").click(() => {
            registerMember();
        });
        $('#name').on('input', function () {
            if ( $(this).val().length < 2 || !window.isValidEmail($('#email').val())) {
                $("#register").hide();
            } else {
                $("#register").show();
            }
        });
        $('#email').on('input', function () {
            if ( $('#name').val().length < 2 || !window.isValidEmail($(this).val())) {
                $("#register").hide();
            } else {
                $("#register").show();
            }
        });
    });

})();