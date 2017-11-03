(function () {
    "use strict";
    const apiUrl = "http://localhost:4500/api/shows/";
    let showId;
    let show;

    function retrieveShowId() {
        let error = false;
        try {
            const showToUpdateString = sessionStorage.getItem("broadwayShow");
            showId = JSON.parse(showToUpdateString);
        } catch (e) {
            alert(`Error when reading from Session Storage ${e}. Select a show from the index page.`);
            error = true;
        }
        if (error) {
            window.location.href = "index.html";
        }
    }

    function getShowById() {
        $.ajax({
            url: `${apiUrl}${showId}`,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    show = data;
                    $('#update-form').hide();
                    displayShow(data);
                } else {
                    alert("Could not retrieve show from the back-end");
                }
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
                alert(error, status, request);
            }
        });
    }

    function displayShow(show) {
        const container = $('#container').empty();
        container.append(
            $(`<table>
				<tr class="head">
					<th>${show.name}</th>
					<th>${show.location}</th>
                    <th>${window.displayTimeShortNames(new Date(show.start))} 
                    ${window.displayTimeAmPm(new Date(show.start))} - 
                    ${window.displayTimeAmPm(new Date(show.end))}</th>
				</tr>
			</table>`)
        );
        show.members.forEach(member => {
            const editButton = $(` <input type="button" data-attr="${member._id}" value="Edit">`);
            const deleteButton = $(`<input type="button" data-attr="${member._id}" value="Delete">`);
            const action = $(`<div class="action">`);
            const interest =  $(
                `<div class="interest">
                    <span>${member.name}</span>
                    <blockquote>
                    ${member.note}
                    </blockquote>
                </div>`);
            action.append(editButton).append(deleteButton);
            interest.append(action);
            container.append(interest);
            editButton.on('click', () => {editMember(member);});
            deleteButton.on('click', () => {deleteMember(member);});
        });
        if(show.members.length < 1) {
            container.append(`<h2>No one has registered yet.  Register on the index page.</h2>`);
        }
    }

    function editMember(member) {
        $('#email').val(member.email);
        $('#name').val(member.name);
        $('#interest').val(member.note);
        $('#show').val(show.name);
        $('#location').val(show.location);
        $("#update-registration").hide();        
        $('#update-form').show();
        $("#update-registration").click(() => {
            updateMember(member);
        });
    }

    /*  TODO: Make AJAX call to delete member on the backend API.
     *  Get the updated version of the show if update request is successful.
     * */
    function deleteMember(member) {
        window.alert('Delete button clicked');
    }

    /*  TODO: Update the values of the member object. 
     *  Make AJAX call to request the update on the backend API.
     *  Get the updated version of the show if update request is successful.
     * */
    function updateMember(member) {
        window.alert('Edit button clicked');
    }

    $(document).ready( () => {
        retrieveShowId();
        $('#update-form').hide();
        getShowById();

        $('#name').on('input', function () {
            if ( $(this).val().length < 2 || !window.isValidEmail($('#email').val())) {
                $("#update-registration").hide();
            } else {
                $("#update-registration").show();
            }
        });
        $('#email').on('input', function () {
            if ( $('#name').val().length < 2 || !window.isValidEmail($(this).val())) {
                $("#update-registration").hide();
            } else {
                $("#update-registration").show();
            }
        });
        $('#interest').on('input', function () {
            if ( $('#name').val().length < 2 || !window.isValidEmail($('#email').val())) {
                $("#update-registration").hide();
            } else {
                $("#update-registration").show();
            }
        });
    });
})();