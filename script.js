"use strict";

let apiUrl = `https://jsonplaceholder.typicode.com/posts?_limit=6&_page=1`;
let apiUrlAll = `https://jsonplaceholder.typicode.com/posts?`;
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const posts = document.getElementById("posts");
const blog = document.getElementById("blog");
const spinner = document.getElementById("spinner");

//First six posts are fetched and printed
console.log(apiUrl);
showPosts(apiUrl);
async function showPosts(url) {
  let response = await fetch(url, {
    method: "GET",
  });

  let postRes = await response.json();

  postRes.forEach((i) => {
    const post = `
    <div class="col m-4" id="blog">
      <div class="card  h-100" >
              <div class="card-body">
                <div class="card-header">${i.id}</div>
                  <h5 class="card-title">${i.title}</h5>
                  <p class="card-text">${i.body}</p>
              </div>                  
      </div>
    </div>
    `;
    console.log(post);

    posts.insertAdjacentHTML("beforebegin", post);
  });
}
//Other 96 post are fetched
let page = 2;
window.addEventListener("scroll", function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 6) {
    spinner.classList.remove("visually-hidden");
    setTimeout(() => {
      spinner.classList.add("visually-hidden");
      setTimeout(() => {
        let apiUrlload = `https://jsonplaceholder.typicode.com/posts?_limit=6&_page=${page}`;
        page++;
        showPosts(apiUrlload);
      }, 1000);
    }, 2000);
  }
});

const searchButton = document.getElementById("btn");
const searchInput = document.getElementById("input");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  posts.innerHTML = ""; //???Doesn't know why this is not working

  let inputValue = searchInput.value;
  console.log(inputValue);

  //All 100 blogs fetched and filterd
  async function showPostsAll() {
    let responseAll = await fetch(apiUrlAll, {
      method: "GET",
    });

    let postResAll = await responseAll.json();
    console.log(postResAll);

    const filteredPost = postResAll.filter((d) => d.body.includes(inputValue));

    console.log("arr1", filteredPost);

    filteredPost.forEach((i) => {
      const post = `
      <div class="col m-4" id="blog">
        <div class="card  h-100" >
                <div class="card-body">
                  <div class="card-header">${i.id}</div>
                    <h5 class="card-title">${i.title}</h5>
                    <p class="card-text">${i.body}</p>
                </div>                  
        </div>
      </div>
      `;
      console.log(post);

      posts.insertAdjacentHTML("beforebegin", post);
    });
  }
  showPostsAll(apiUrlAll);
});
