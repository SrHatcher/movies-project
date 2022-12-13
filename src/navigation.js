searchFormBTN.addEventListener('click', ()=>{
    location.hash = 'search'
})
trendingBTN.addEventListener('click', ()=>{
    location.hash = 'trends'
})
arrowBTN.addEventListener('click', ()=>{
    location.hash = 'home'
})
window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator,false)

function navigator(){
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
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
}

function trendsPage(){
    console.log('trends!');

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
}