let watchlistRenderHolder = document.getElementById("watchlistRenderHolder") 
let result

document.addEventListener("click", function(e){
    if (e.target.id === "remove-watchlist")
    {removeFromWatchList(e.target.dataset.id)}
})

function removeFromWatchList (id) {
    let result = JSON.parse(localStorage.getItem("watchlist-array")).filter(x => x.imdbID != id)
    localStorage.setItem('watchlist-array', JSON.stringify(result))
    watchlistRenderHolder.innerHTML = "" 
    if (JSON.parse(localStorage.getItem("watchlist-array")).length === 0) {
        watchlistRenderHolder.innerHTML = `
        <div class="empty-watchlist">
            <p id="emptyWatchList">Your watchlist is looking a little empty...</p>
            <a href="index.html" id="emptyWatchListSecond" >
                <i class="fa-solid fa-circle-plus" id="return-btn"></i><span>Let's add some movies!</span> 
            </a>
        </div>
        `
    }else {
    renderWatchList()}
}

function renderWatchList () {
    if (JSON.parse(localStorage.getItem("watchlist-array")).length === 0) {
        watchlistRenderHolder.innerHTML = `
        <div class="empty-watchlist">
            <p id="emptyWatchList">Your watchlist is looking a little empty...</p>
            <a href="index.html" id="emptyWatchListSecond">
                <i class="fa-solid fa-circle-plus" id="return-btn"></i><span>Let's add some movies!</span> 
            </a>
        </div>
        `
    }   
    else { 
        JSON.parse(localStorage.getItem("watchlist-array")).forEach(movie => {
        watchlistRenderHolder.innerHTML += `
        <div class="movie" id="watchListStyling">
            <img src="${movie.Poster}" class="moviePoster">
            <div class="movie-info">
                <div class="movie-title">
                    <span class="title">${movie.Title}</span> 
                    <div class="rating">
                        <i class="fa-solid fa-star star"></i>
                        <p class="movie-rating">${movie.imdbRating}</p>
                    </div>
                </div>
                <div class="movie-genre second-line-movie-desc">
                    <p class="runTime">${movie.Runtime}</p>
                    <div class="movie-genre">${movie.Genre}</div>
                    <button id="remove-watchlist" data-id=${movie.imdbID}>
                       <i class="fa-solid fa-circle-minus"></i> Remove
                    </button>
                </div>
                <p class="synopsis">${movie.Plot}</p> 
            </div>
        </div>
        <div id="borderWatchList"> </div>
        `   
    })}  
}

renderWatchList()



