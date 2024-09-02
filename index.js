const apikey = '8bd9ec16312c4dcc84e56524a41a0ee8';
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomnNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data)
        return data.articles;
    } catch(error){
        console.error("Error fetching random news", error);
        return[];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.error("Error fetching news by query", error);
        }
        
    }
});

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fetching random news", error);
        return[];
    }
}



function displayBlogs(articles){
    blogContainer.innerHTML = '';
    articles.forEach((article) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = 
        article.title.length > 30 
        ? article.title.slice(0, 30) + "...." 
        : article.title
        title.textContent = truncatedTitle
        const description = document.createElement("p");
        description.textContent = article.description;

        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogcard);


    }
)}

(async () => {
    try {
    const articles = await fetchRandomnNews();
    displayBlogs(articles);
    } catch (error) {
        console.error('Error loading random news', error);
    }
})();
