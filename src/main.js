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

const lazyLoader = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            const url=entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url)
            lazyLoader.unobserve(entry.target)
        }
    })
})

function fillMovies(movies, node, {lazyLoad = false, clean = true} = {}){
    if(clean){
        node.innerHTML = ''
    }
    
    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')

        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute(lazyLoad ? 'data-img' : 'src', API_IMAGE(movie.poster_path))
        movieContainer.appendChild(movieImg)
        movieContainer.addEventListener('click', ()=>{
            location.hash = 'movie=' + movie.id
        })

        if(lazyLoad){
            lazyLoader.observe(movieImg)
        }

        movieImg.addEventListener('error', ()=>{
            movieImg.setAttribute('src', 'https://static.platzi.com/static/images/error/img404.png')
        })
        node.appendChild(movieContainer)

        const movieBTN = document.createElement('button')
        movieBTN.classList.add('movie-btn')
        movieBTN.addEventListener('click', (event)=>{
            movieBTN.classList.toggle('movie-btn--liked')
            event.stopPropagation()
            //TODO: agregar pelicula a localstorage
        })

        movieContainer.appendChild(movieBTN)
    });
}

//llamados a la api

async function getConfigurationData(){
    const res = await fetch(API_Configuration)
    const data = await res.json()
    console.log(data);
}



async function getPaginatedMoviesForTrending(){
    const  {scrollTop, scrollHeight, clientHeight} = document.documentElement
    const isScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 200)
    const pageIsNotMax = page < maxPage

    if(isScrollBottom && pageIsNotMax){
        page++
        const {data} = await fetchData(`trending/movie/day`, {
            params: {
                page
            }
        })
        maxPage = data.total_pages
        const movies = data.results
        fillMovies(movies, genericSection, {lazyLoad: true, clean: false})
    }
}

async function getTrendingMoviesPreview(){
    const {data} = await fetchData(`trending/movie/day`)
    const movies = data.results

    fillMovies(movies, trendingMoviesPreviewList, {lazyLoad: true})
}


async function getTrendingMovies(){
    

    const {data} = await fetchData(`trending/movie/day`)
    const movies = data.results
    maxPage = data.total_pages

    fillMovies(movies, genericSection, {lazyLoad: true, clean: true})    
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
    //console.log(data);
    const movies = data.results
    fillMovies(movies, genericSection , {lazyLoad: true})
    
}

function getPaginatedMoviesForCategory(id){
    return async function (){
        const  {scrollTop, scrollHeight, clientHeight} = document.documentElement
        const isScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 50)
        const pageIsNotMax = page < maxPage

        if(isScrollBottom && pageIsNotMax){
            page++
            const {data} = await fetchData(`discover/movie`, {
                params: {
                    with_genres: id,
                    page
                }
        })
        maxPage = data.total_pages
        const movies = data.results
        fillMovies(movies, genericSection, {lazyLoad: true, clean: false})
    }
    }
}

async function getMoviesBySearch(query){
    if(!(query.trim().length < 1)){
        const {data} = await fetchData(`search/movie`, {
            params: {
                query
            }
        })
        console.log(data);
        maxPage = data.total_pages
        const movies = data.results
        fillMovies(movies, genericSection)
    }
}

function getPaginatedMoviesForSearch(query){
    return async function (){
        const  {scrollTop, scrollHeight, clientHeight} = document.documentElement
        const isScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 50)
        const pageIsNotMax = page < maxPage

        if(isScrollBottom && pageIsNotMax){
            page++
            const {data} = await fetchData(`search/movie`, {
                params: {
                    query,
                    page
                }
        })
        console.log(data);
        const movies = data.results
        fillMovies(movies, genericSection, {lazyLoad: true, clean: false})
    }
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

    fillMovies(relatedMovies, relatedMoviesContainer, {lazyLoad: true, clean: true})
    relatedMoviesContainer.scrollTo(0,0)
}

