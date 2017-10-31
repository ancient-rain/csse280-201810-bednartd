(function () {
    "use strict";
    let $loginButton;

    function setupForRosefire() {
        $loginButton.click( () => {
            // Please note this needs to be the result of a user interaction
            // (like a button click), otherwise it will get blocked as a popup
            // Use your Registry Token on the client side in the signIn function
            // so that client receives authentication token to authenticate with 
            // server when accessing protected API routes 
            // Can use token in Postman to test.
            Rosefire.signIn("d37c11be-eb3c-4ad6-9b2e-6619409cb8e0", (err, rfUser) => {
                if (err) {
                    alert("Error, User is not logged in");
                    return;
                } else {
                    alert(`Use this token to authenticate with your server ${rfUser.token}`);
                    console.log(rfUser);
                    // Save token in session storage
                    sessionStorage.setItem('token', JSON.stringify(rfUser.token));
                    window.location.href ="users.html";
                }
            });
        });
    }

    $(document).ready( () => {
        // setup for logging in via rosefire
        $loginButton = $("#btnSubmit");
        setupForRosefire();
    });

})();