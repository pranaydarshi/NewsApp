const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const country = "in";
const apiKey = "56e42cf3a09848c493373f19d60a0f3a";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

// 100 requests per day
let requestURL;

// Create cards from data
const generateUI = (articles) => {
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
      <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
      </div>
      <div class="news-content">
        <div class="news-title">
          ${item.title}
        </div>
        <div class="news-description">
          ${item.description || item.content || ""}
        </div>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>`;
    container.appendChild(card);
  }
};

// News API Call using JSONP
const getNews = () => {
  container.innerHTML = "";
  // Use fetchJsonp instead of fetch
  fetchJsonp(requestURL)
    .then((response) => response.json())
    .then((data) => generateUI(data.articles))
    .catch((error) => {
      alert("Data unavailable at the moment. Please try again later");
      console.error(error);
    });
};

// Category Selection
const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

// Options Buttons
const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${i === "general" ? "active" : ""
      }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

const init = () => {
  optionsContainer.innerHTML = "";
  getNews();
  createOptions();
};

window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};
