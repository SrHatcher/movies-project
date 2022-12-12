const API = (endpoint) => `https://api.themoviedb.org/3/${endpoint}`
const API_Configuration = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
const API_IMAGE = (posterPath) => `http://image.tmdb.org/t/p/w154/${posterPath}`

async function getConfigurationData(){
    const res = await fetch(API_Configuration)
    const data = await res.json()
    console.log(data);
}

async function getTrendingMoviesPreview(){
    const res = await fetch(API(`trending/movie/day?api_key=${API_KEY}`))
    const data = await res.json()

    const movies = data.results
    console.log(movies);
    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')
        
        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', API_IMAGE(movie.poster_path))
        movieContainer.appendChild(movieImg)
        trendingPreviewMoviesContainer.appendChild(movieContainer)
    });

}

async function getGenresPreview(){
    const res = await fetch(API(`genre/movie/list?api_key=${API_KEY}`))
    const data = await res.json()

    const categories = data.genres
    categories.forEach(category => {
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')
        
        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('category-title')
        categoryTitle.setAttribute('id', `id${category.id}`)

        const categoryTitleText = document.createTextNode(category.name)
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        previewCategoriesContainer.appendChild(categoryContainer)
    });

}

getConfigurationData()
getTrendingMoviesPreview()
getGenresPreview()