let page = 1
let maxPage
let infiniteScroll
window.addEventListener('scroll', infiniteScroll, {passive:false})

searchFormBTN.addEventListener('click', ()=>{
    location.hash = `search=${searchFormInput.value.trim()}` 
})
trendingBTN.addEventListener('click', ()=>{
    location.hash = 'trends'
})
arrowBTN.addEventListener('click', ()=>{
    const stateLoad = window.history.state ? window.history.state.loadUrl : ''
    if(stateLoad.includes('#')){
        window.location.hash='home'
    }else{
        location.hash= window.history.back()
    }
})
window.addEventListener('DOMContentLoaded', ()=>{
    navigator()
    window.history.pushState({loadUrl: window.location.href}, null, '')
}, false)
window.addEventListener('hashchange', navigator,false)

function navigator(){
    if(infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, {passive: false})
        infiniteScroll = undefined
    }
    if(location.hash.startsWith('#trends')){
        trendsPage()
    }else if(location.hash.startsWith('#search')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        moviePage()
    }else if(location.hash.startsWith('#category=')){
        categoryPage()
    }else{
        homePage()
    }

    if(infiniteScroll){
        window.addEventListener('scroll', infiniteScroll, {passive: false})
        page = 1
    }
}

function homePage(){

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBTN.classList.add('inactive')
    arrowBTN.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

    getTrendingMoviesPreview()
    getGenresPreview()
}

function searchPage(){
    console.log('search!');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBTN.classList.remove('inactive')
    arrowBTN.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, query]= location.hash.split('=')
    getMoviesBySearch(query)
    infiniteScroll = getPaginatedMoviesForSearch(query)
}

function trendsPage(){
    console.log('trends!');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBTN.classList.remove('inactive')
    arrowBTN.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    headerCategoryTitle.innerHTML='Tendencias'
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    getTrendingMovies()
    infiniteScroll = getPaginatedMovies
}

function moviePage(){
    console.log('movie!');

    headerSection.classList.add('header-container--long')
    //headerSection.style.background = ''
    arrowBTN.classList.remove('inactive')
    arrowBTN.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    const [_, movieId]= location.hash.split('=')
    getmovieById(movieId)
}

function categoryPage(){
    console.log('category!');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBTN.classList.remove('inactive')
    arrowBTN.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, categoryData]= location.hash.split('=')
    const [categoryID, categoryName]= categoryData.split('-')
    getMoviesByCategory(categoryID, categoryName)

    infiniteScroll = getPaginatedMoviesForCategory(categoryID)
}