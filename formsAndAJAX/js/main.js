(function () {
    "use strict";

    const responseDiv = document.getElementById('search-by-title-response');
    let title, year, plot, response;

    function getFormData() {
        title = $('#title').val();
        year = $('#year').val();
        plot = $('select[name="plot"] option:selected').val();
        response = $('select[name="response"] option:selected').val();

        loadMovieData();
    }

    function clearForm() {
        $('#title').text('');
        $('#year').text('');
        $('#plot select[value="full"]').attr('selected', true);
        $('#response select[value="xml"]').attr('selected', true);

        responseDiv.innerHTML = '';
    }

    function loadMovieData() {
        const inputData = { 
            t: title.replace(/ /g, '+'),
            r: response,
            y: year,
            plot: plot 
        };

        $.ajax({
            url: 'http://www.omdbapi.com/?apikey=89b61c03',
            type: 'GET',
            data: inputData,
            success: data => {
                if (data.Title) {
                    console.log(data);
                } else {
                    console.log('Movie not found!');
                }
            },
            error: (req, status, error) => {
                console.log(error, status, req);
            }
        });
    }

    function displayMovie(data) {
        // TODO: get all the properties
        /* TODO: create outer div that you return.
            Append all the data to the outer div.
            Make sure it is formated to the picture
        */
    }

    $(document).ready(function () {
        //load in initial state
        const searchBtn = $('#search-by-title-button');
        const resetBtn = $('#search-by-title-reset');

        responseDiv = $('#search-by-title-response');

        searchBtn.on('click', getFormData);
        resetBtn.on('click', clearForm);
    });
})();