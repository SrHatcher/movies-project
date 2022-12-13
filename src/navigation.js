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
    getTrendingMoviesPreview()
    getGenresPreview()
}

function searchPage(){
    console.log('search!');
}

function trendsPage(){
    console.log('trends!');
}

function moviePage(){
    console.log('movie!');
}

function categoryPage(){
    console.log('category!');
}