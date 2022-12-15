const fetchData = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',  
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
})

const API_Configuration = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
const API_IMAGE = (posterPath) => `http://image.tmdb.org/t/p/w154/${posterPath}`

getConfigurationData()
//utils

function fillMovies(movies, node){
    node.innerHTML = ''
    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')
        
        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', API_IMAGE(movie.poster_path))
        movieContainer.appendChild(movieImg)
        movieContainer.addEventListener('click', ()=>{
            location.hash = 'movie=' + movie.id
        })

        node.appendChild(movieContainer)
    });
}

//llamados a la api

async function getConfigurationData(){
    const res = await fetch(API_Configuration)
    const data = await res.json()
    console.log(data);
}

async function getTrendingMoviesPreview(){
    const {data} = await fetchData(`trending/movie/day`)
    const movies = data.results

    fillMovies(movies, trendingMoviesPreviewList)
}

async function getTrendingMovies(){
    const {data} = await fetchData(`trending/movie/day`)
    const movies = data.results

    fillMovies(movies, genericSection)
}

async function getGenresPreview(){
    const {data} = await fetchData(`genre/movie/list`)

    const categories = data.genres
    categoriesPreviewList.innerHTML=''
    categories.forEach(category => {
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')
        
        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('category-title')
        categoryTitle.setAttribute('id', `id${category.id}`)
        categoryTitle.addEventListener('click', ()=>{
            location.hash= `category=${category.id}-${category.name}`
        })

        const categoryTitleText = document.createTextNode(category.name)
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        categoriesPreviewList.appendChild(categoryContainer)
    });

}

async function getMoviesByCategory(id, categoryName){
    const {data} = await fetchData(`discover/movie`, {
        params: {
            with_genres: id,
        }
    })
    
    headerCategoryTitle.innerHTML = categoryName
    const movies = data.results
    fillMovies(movies, genericSection)
    
}

async function getMoviesBySearch(query){
    console.log(query)
    if(!(query.trim().length < 1)){
        const {data} = await fetchData(`search/movie`, {
            params: {
                query
            }
        })
        const movies = data.results
        fillMovies(movies, genericSection)
    }
}

async function getmovieById(id){
    const { data: movie }= await fetchData(`movie/${id}`)
    
    movieDetailTitle.textContent = movie.title
    movieDEtailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average

    const movieImgUrl = 'http://image.tmdb.org/t/p/w500/' + movie.poster_path
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%) ,url(${movieImgUrl})`

    categoriesMovieDetailList.innerHTML = ''
    console.log(movie)
    movie.genres.forEach(genre => {
        const genreContainer = document.createElement('div')
        const genreTitle = document.createElement('h3')

        genreContainer.classList.add('category-container')
        genreTitle.classList.add('category-title')
        genreTitle.setAttribute('id', `id${genre.id}`)
        genreTitle.innerText = genre.name

        genreContainer.appendChild(genreTitle)
        categoriesMovieDetailList.appendChild(genreContainer)
    })

    getRelatedMoviesById(id)
}

async function getRelatedMoviesById(id){
    const { data } = await fetchData(`movie/${id}/similar`)
    const relatedMovies = data.results

    fillMovies(relatedMovies, relatedMoviesContainer)
    relatedMoviesContainer.scrollTo(0,0)
}