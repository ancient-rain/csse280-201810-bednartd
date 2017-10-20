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
                    displayMovie(data);
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
        // DONE: get all the properties
        /* DONE: create outer div that you return.
            Append all the data to the outer div.
            Make sure it is formated to the picture
        */
        const responseDiv = document.getElementById('search-by-title-response');
        const title = document.createElement('p');
        const year = document.createElement('p');
        const rated = document.createElement('p');
        const released = document.createElement('p');
        const runtime = document.createElement('p');
        const genre = document.createElement('p');
        const director = document.createElement('p');
        const writer = document.createElement('p');
        const actors = document.createElement('p');
        const plot = document.createElement('p');
        const language = document.createElement('p');
        const country = document.createElement('p');
        const awards = document.createElement('p');
        const poster = document.createElement('p');
        const ratingsDiv = document.createElement('div');
        const ratings = document.createElement('p');
        const ratingsFirst = document.createElement('p');
        const ratingsSecond = document.createElement('p');
        const ratingsThird = document.createElement('p');
        const metascore = document.createElement('p');
        const imdbRating = document.createElement('p');
        const imdbVotes = document.createElement('p');
        const imdbId = document.createElement('p');
        const type = document.createElement('p');
        const dvd = document.createElement('p');
        const boxOffice = document.createElement('p');
        const production = document.createElement('p');
        const website = document.createElement('p');
        const response = document.createElement('p');

        title.innerHTML = `<span>Title: </span><span>${data.Title}</span>`;
        year.innerHTML = `<span>Year: </span><span>${data.Year}</span>`;
        rated.innerHTML = `<span>Rated: </span><span>${data.Rated}</span>`;
        released.innerHTML = `<span>Released: </span><span>${data.Released}</span>`;
        runtime.innerHTML = `<span>Runtime: </span><span>${data.Runtime}</span>`;
        genre.innerHTML = `<span>Genre: </span><span>${data.Genre}</span>`;
        director.innerHTML = `<span>Director: </span><span>${data.Director}</span>`;
        writer.innerHTML = `<span>Writer: </span><span>${data.Writer}</span>`;
        actors.innerHTML = `<span>Actors: </span><span>${data.Actors}</span>`;
        plot.innerHTML = `<span>Plot: </span><span>${data.Plot}</span>`;
        language.innerHTML = `<span>Language: </span><span>${data.Language}</span>`;
        country.innerHTML = `<span>Country: </span><span>${data.Country}</span>`;
        awards.innerHTML = `<span>Awards: </span><span>${data.Awards}</span>`;       
        metascore.innerHTML = `<span>Metascore: </span><span>${data.Metascore}</span>`;
        imdbRating.innerHTML = `<span>imdbRating: </span><span>${data.imdbRating}</span>`;
        imdbVotes.innerHTML = `<span>imdbVotes: </span><span>${data.imdbVotes}</span>`;
        imdbId.innerHTML = `<span>imdbId: </span><span>${data.imdbID}</span>`;
        type.innerHTML = `<span>Type: </span><span>${data.Type}</span>`;
        dvd.innerHTML = `<span>DVD: </span><span>${data.DVD}</span>`;
        boxOffice.innerHTML = `<span>Box Office: </span><span>${data.BoxOffice}</span>`;
        production.innerHTML = `<span>Production: </span><span>${data.Production}</span>`;
        website.innerHTML = `<span>Website: </span><span>${data.Website}</span>`;
        response.innerHTML = `<span>Response: </span><span>${data.Response}</span>`;

        poster.innerHTML = `<span>Poster: </span><img src="${data.Poster}"></img>`;
        
        ratings.innerHTML = `<span>Ratings: </span>`;
        ratings.className = 'display-ratings-first';
        ratingsFirst.innerHTML = `<span class="inline-span">${data.Ratings[0].Source}: </span><span class="inline-span">${data.Ratings[0].Value}</span>`;
        ratingsFirst.className = 'display-ratings';
        ratingsSecond.innerHTML = `<span class="inline-span">${data.Ratings[1].Source}: </span><span class="inline-span">${data.Ratings[1].Value}</span>`;
        ratingsSecond.className = 'display-ratings';
        ratingsThird.innerHTML = `<span class="inline-span">${data.Ratings[2].Source}: </span><span class="inline-span">${data.Ratings[2].Value}</span>`;
        ratingsThird.className = 'display-ratings';
        ratingsDiv.appendChild(ratings);
        ratingsDiv.appendChild(ratingsFirst);
        ratingsDiv.appendChild(ratingsSecond);
        ratingsDiv.appendChild(ratingsThird);

        responseDiv.innerHTML = '';

        responseDiv.appendChild(title);
        responseDiv.appendChild(year);
        responseDiv.appendChild(rated);
        responseDiv.appendChild(released);
        responseDiv.appendChild(runtime);
        responseDiv.appendChild(genre);
        responseDiv.appendChild(director);
        responseDiv.appendChild(writer);
        responseDiv.appendChild(actors);
        responseDiv.appendChild(plot);
        responseDiv.appendChild(language);
        responseDiv.appendChild(country);
        responseDiv.appendChild(awards);
        responseDiv.appendChild(poster);
        responseDiv.appendChild(ratingsDiv);
        responseDiv.appendChild(metascore);
        responseDiv.appendChild(imdbRating);
        responseDiv.appendChild(imdbVotes);
        responseDiv.appendChild(imdbId);
        responseDiv.appendChild(type);
        responseDiv.appendChild(dvd);
        responseDiv.appendChild(boxOffice);
        responseDiv.appendChild(production);
        responseDiv.appendChild(website);
        responseDiv.appendChild(response);
    }

    $(document).ready(function () {
        //load in initial state
        const searchBtn = $('#search-by-title-button');
        const resetBtn = $('#search-by-title-reset');

        searchBtn.on('click', getFormData);
        resetBtn.on('click', clearForm);
    });
})();