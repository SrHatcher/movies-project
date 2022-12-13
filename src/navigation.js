searchFormBTN.addEventListener('click', ()=>{
    if(location.hash.startsWith('#search=')){
        if(location.hash.endsWith('#search=')){
            location.hash = `search=${searchFormInput.value}` 
        }else{
            location.hash = location.hash + ',' + searchFormInput.value
        }
    }else{
        location.hash = `search=${searchFormInput.value}`
    }
    
})
trendingBTN.addEventListener('click', ()=>{
    location.hash = 'trends'
})
arrowBTN.addEventListener('click', ()=>{
    const [hash, history] = location.hash.split('=')
    const historyList = history.split(',')
    if(historyList.length > 1){
        historyList.pop()
        const newHistoryList = historyList.join(',')
        location.hash = `${hash}=${newHistoryList}`
    }else{
        location.hash = 'home'
    }
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
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, query]= location.hash.split('=')
    const searchs = query.split(',')
    getMoviesBySearch(searchs.at(-1))
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

    const [_, categoryData]= location.hash.split('=')
    const [categoryID, categoryName]= categoryData.split('-')
    getMoviesByCategory(categoryID, categoryName)
}