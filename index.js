const movieNameInput = document.getElementById('input-box')
const searchBtn = document.getElementById('search-btn')


searchBtn.addEventListener('click', searchMovie)

async function searchMovie(){
    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=b9dfc050&s=${movieNameInput.value}`)
    const data = await res.json()
    let searchList=[]
    for (let movie of data.Search){
        const movieData = await searchByimbdId(movie)
        searchList.push(movieData)
    }
    console.log(searchList)
    renderMovies(searchList)
    // the data we need are 
}


async function searchByimbdId(movie){
    console.log('inside id function')
    const res = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=b9dfc050`)
    const data = await res.json()
    return data
}



function renderMovies(movieList){
    let renderHtml = ''
    movieList.forEach(movie => {
        renderHtml += `     
            <div class="movie-holder" id="movie-holder">
                <div class="image-holder">
                    <img class="poster-image" src=${movie.Poster}>
                    <!-- poster of movie here -->
                </div>
                <div class="details-holder">
                    <div class="line-1">
                        <h2 class="movie-name">${movie.Title} <span class="rating-icon">&#9733</span> <span class="movie-subheading">${movie.imdbRating}</span></h2>
                    </div>
                    <div class="line-2 movie-subheading">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <div class="watchlist-add-div">
                            <button class="add-to-watchlist" data-id="${movie.imdbID}"><i class="fa-solid fa-plus"></i></button>
                            <p>Watchlist</p>
                        </div>
                    </div>
                    <div class="line-3">
                        <p >${movie.Plot}</p>
                    </div>
                    <!-- details of movie here -->

                </div>
            </div>
            <hr class="line-between"></hr>
        `
    });
    document.getElementById('movie-list').innerHTML = renderHtml
}

`       <div class="movie-holder" id="movie-holder">
            <div class="image-holder">
                <img class="poster-image" src="images/bladerunner.png">
                <!-- poster of movie here -->
            </div>
            <div class="details-holder">
                <div class="line-1">
                    <h2 class="movie-name">Blade Runner <span class="rating-icon">&#9733</span> <span class="movie-subheading">8.1</span></h2>
                </div>
                <div class="line-2 movie-subheading">
                    <p>116 min</p>
                    <p>Drama, Mystery, Sci-fi</p>
                    <div class="watchlist-add-div">
                        <button class="add-to-watchlist" id="add-to-watchlist"><i class="fa-solid fa-plus"></i></button>
                        <p>Watchlist</p>
                    </div>
                </div>
                <div class="line-3">
                    <p >A blade runner ust pursue and terminate four replicants who stole a ship in space,
                         and have returned to Earth to find their creator.</p>
                </div>
                <!-- details of movie here -->

            </div>
        </div>
        <hr class="line-between"></hr>
`

