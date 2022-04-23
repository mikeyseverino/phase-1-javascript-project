//fetch Wordpress articles from TechCrunch
function fetchNewsArticles() {
    fetch("https://techcrunch.com/wp-json/wp/v2/posts?per_page=100&context=embed")
   .then(resp => resp.json())
   .then(json => newsArticles(json))
}

//Display article titles on web app
function newsArticles(articles){
    let articleContainer = document.getElementById("article-container")
    let logoContainer = document.getElementById("logo-spot")
    let appendLogo = document.createElement("ul");
    appendLogo.innerHTML = `<img src="https://techcrunch.com/wp-content/themes/techcrunch-2017/images/logo-json-ld.png">`
    logoContainer.appendChild(appendLogo);

    articles.forEach(article => {
        let ul = document.createElement("ul");
        ul.innerHTML = `
        <div class="card">
            <div class="article-picture" >
                <img src=${article.jetpack_featured_media_url}>
            </div> <ul class="like"> <span class="like-glyph">&#x2661;</span></ul>
            <h3>${article.title.rendered}</h3>
        </div>
        `
        articleContainer.appendChild(ul);
   });
}

//define liking callback function
function likeCallback(e) {
    const heart = e.target;
    changeHeart()
      .then(function(){
        if ( heart.innerText === EMPTY_HEART) {
          heart.innerText = FULL_HEART;
          heart.className = "activated-heart";
        } else {
          heart.innerText = EMPTY_HEART;
          heart.className = "";
        }
      })
      .catch(function(error) {
        const modal = document.getElementById("modal");
        modal.className = "";
        modal.innerText = error;
        setTimeout(() =>  modal.className = "hidden", 3000);
      });
  }

//created heart glyphs
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

const articleHearts = document.querySelectorAll(".like-glyph");

//Event listener for liking functionality
for (const glyph of articleHearts) {
    glyph.addEventListener("click", likeCallback);
  }

//event listener for clicking on article and being taken to article page

document.addEventListener('DOMContentLoaded', () => {
    fetchNewsArticles();
});

