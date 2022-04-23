//fetch Wordpress articles from TechCrunch
function fetchNewsArticles() {
    fetch("https://techcrunch.com/wp-json/wp/v2/posts?per_page=100&context=embed")
   .then(resp => resp.json())
   .then(json => newsArticles(json))
}

//Display article titles on web app
function newsArticles(articles){
    let articleContainer = document.getElementById("article-container")
    // let logoContainer = document.getElementById("logo-spot")
    // let appendLogo = document.createElement("img");
    // appendLogo.innerHTML = `<img src=${articles.parsely.meta.publisher.logo.url}>`
    // logoContainer.appendChild(appendLogo);
    articles.forEach(article => {
        let ul = document.createElement("ul");
        ul.innerHTML = `
        <div class="card">
            <div class="article-picture" >
                <img src=${article.jetpack_featured_media_url}>
            </div>
            <h3>${article.title.rendered}</h3>
        </div>
        `
        articleContainer.appendChild(ul);
   });
}

//placeholder for event listener for liking functionality, maybe comment functionality?
//event listener for clicking on article and being taken to article page

document.addEventListener('DOMContentLoaded', () => {
    fetchNewsArticles();
});

