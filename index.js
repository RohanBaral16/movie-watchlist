const movieNameInput = document.getElementById('input-box')
const searchBtn = document.getElementById('search-btn')
let watchList = []

if(document.title === 'Watchlist'){
    renderWatchList()
    document.body.addEventListener('click', (e)=>{
        if(e.target.dataset.id){
            removeFromWatchList(e.target.dataset.id)
        }
    })
}

function removeFromWatchList(movieId){
    if(watchList.includes(movieId)){
        let index = watchList.indexOf(movieId)
        console.log('before removing, index', watchList, index)
        watchList.splice(index, 1)
        console.log('after removing, ', watchList)
        localStorage.setItem('watchlist', JSON.stringify(watchList))
        renderWatchList()
    }
}


searchBtn.addEventListener('click', searchMovie)
document.getElementById('search-list').addEventListener('click', addToWatchlist)


function getWatchList(){
    if(localStorage.getItem('watchlist')){
        watchList = JSON.parse(localStorage.getItem('watchlist'))
    }
    console.log('got watchlist: ', watchList)
}

function addToStorage(movieId){
    if(!watchList.includes(movieId)){
        watchList.push(movieId)
        localStorage.setItem('watchlist', JSON.stringify(watchList))
    }
}
function addToWatchlist(event){
    if(event.target.dataset.id){
        getWatchList()
        if(!watchList.includes(event.target.dataset.id)){
            event.target.disabled = true;
            addToStorage(event.target.dataset.id)
        }
        else{
            console.log("Already in the array")
        }
    }
}

async function searchMovie(){
    document.getElementById('search-list').innerHTML = ''
    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=b9dfc050&s=${movieNameInput.value}`)
    const data = await res.json()
    console.log(data)
    let searchList=[]
    for (let movie of data.Search){
        const movieData = await searchByimbdId(movie.imdbID)
        searchList.push(movieData)
        renderMovies(movieData, 'search-list')
    }
    console.log(searchList)
    // the data we need are 
}


async function searchByimbdId(movieID){
    console.log('inside id function')
    const res = await fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=b9dfc050`)
    const data = await res.json()
    console.log('data fetched', data)
    return data
}

async function renderWatchList(){
    document.getElementById('watch-list').innerHTML = ''
    console.log('rendering watchlist')
    getWatchList()
    console.log(watchList, watchList.length)
    if(watchList.length>0){
        for(let movieId of watchList){
            console.log('inside the loop for movieID', movieId)
            const movieData = await searchByimbdId(movieId)
            console.log('movie pushed to array')
            watchlistHtmlRender(movieData)
        }
    }
}

function renderMovies(movie, listClass){
    let renderHtml = ''
    renderHtml = `     
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
    document.getElementById(listClass).innerHTML += renderHtml
}

function watchlistHtmlRender(movie){
    let renderHtml = `     
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
                            <button class="add-to-watchlist" data-id="${movie.imdbID}"><i class="fa-solid fa-minus"></i></button>
                            <p>Remove</p>
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
    document.getElementById('watch-list').innerHTML += renderHtml
}

