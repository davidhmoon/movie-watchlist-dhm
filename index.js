let searchResultsArray = []
let watchListArray = []
let imdbSearch
let watchlistRenderHolder


document.addEventListener("click", function(e){
    if (e.target.id === "search") {
        getMovieTitles()
    } else if (e.target.id === "addToWatchListBtn") {
        populateWatchListArray(e.target.parentElement.id)
        event.target.disabled = true;
    }   
})

function getMovieTitles() {
    let title = document.getElementById("input-text").value
    fetch(`https://www.omdbapi.com/?apikey=15aa5415&s=${title}`)
        .then(res => res.json())
        .then(data => {
            if (data.Search) {
            let searchResultArray = data.Search
            document.getElementById("default-movie").classList.add("hidden")
            document.getElementById("putDataHere").innerHTML = ""
            searchResultArray.forEach(movie =>{
            fetch(`https://www.omdbapi.com/?apikey=15aa5415&i=${movie.imdbID}`)
                .then(res => {
                    return res.json()
                    })
                .then(data => {
                    let imdbSearch = data 
                    document.getElementById("putDataHere").innerHTML += `
                        <div class="movie">
                            <img src="${movie.Poster}" class="moviePoster">     
                            <div class="movie-info">
                                    <div class="movie-title">
                                        <div class="title">${movie.Title}</div>
                                        <div class="rating">
                                            <i class="fa-solid fa-star star"></i>
                                            <p class="movie-rating">${imdbSearch.imdbRating}</p>
                                        </div> 
                                    </div>
                                    <div id=${imdbSearch.imdbID} class="second-line-movie-desc"> 
                                        <p class="runTime">${imdbSearch.Runtime}</p>
                                        <div class="movie-genre">
                                            <p>${imdbSearch.Genre}</p>
                                        </div>
                                        <button id ="addToWatchListBtn"> 
                                            <i class="fa-solid fa-circle-plus" id="plus-first-page"></i> Watchlist 
                                        </button>
                                    </div>
                                    <div>
                                        <p class="synopsis">${imdbSearch.Plot}</p> 
                                    </div>
                            </div>
                        </div>
                        <div id="border"> </div>
                        </div>
                        `}) //closes inner .then block
                    }) //closes forEach
                } //closes the if
            else {
                  document.getElementById("putDataHere").innerHTML = `
                  <div id="holder-no-result">
                    <div id="no-result">Unable to find what you're looking for. Please try another search</div>
                  </div>`
                  }         
        }) //closes outer .then block
} //closes function

function populateWatchListArray (IMDBiD) {
    if (JSON.parse(localStorage.getItem("watchlist-array")) != null) {
            watchListArray = JSON.parse(localStorage.getItem("watchlist-array"))
        }
        fetch(`https://www.omdbapi.com/?apikey=15aa5415&i=${IMDBiD}`)
            .then(res => res.json())
            .then(data => {
                watchListArray.push(data) 
                localStorage.setItem('watchlist-array', JSON.stringify(watchListArray))
            }) //closes .then block     
}

 


