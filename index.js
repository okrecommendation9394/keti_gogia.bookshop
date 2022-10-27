"use strict";
const logo = document.querySelector(".logo");
const search = document.querySelector(".search");
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const container = document.querySelector(".container");
const buttons = document.querySelectorAll("[data-carousel-button]");
const mainPage = document.querySelector(".main-page");
const cart = document.querySelector(".basket");
const cartPage = document.querySelector(".cart-section");
const empty = document.querySelector(".back-button");
//carousel
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    let activeSlide = slides.querySelector("[data-active]");
    const newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

function getbooks() {
  document.getElementById("output").innerHTML = "";
  fetch(
    "http://openlibrary.org/search.json?q=" +
      document.getElementById("input").value
  )
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < 10; i++) {
        document.getElementById("output").innerHTML +=
          "<div class='book'>" +
          "<h2 class='title'>" +
          data.docs[i].title +
          "</h2>" +
          "<h2 class='author'>" +
          data?.docs[i]?.author_name[0] +
          "</h2>" +
          "<br><img src='http://covers.openlibrary.org/b/isbn/" +
          data?.docs[i]?.isbn[0] +
          "-M.jpg' class='cover'><br>" +
          "<div class='price'>$10.22</div>" +
          "<button type='button' class='cart_button'>ADD TO CART<img src='images/basket.svg' alt='basket'></button>";
        ("</div>");
      }
    });
}
let books;
let xhr = new XMLHttpRequest();
xhr.open("GET", "books.json", true);
xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    books = JSON.parse(this.responseText);
    books.forEach((book) => {
      container?.insertAdjacentHTML(
        "beforeEnd",
        `<div class='books'>
        <div class='title'>${book.title}</div>
        <div class='author'>${book.author}</div>
        <img src=${book.imageLink} alt='cover' class='cover'>
        <div class='price'>price:${book.price}$</div>
        <button type='button' class='js_button number${book.id}' style="width: 60%">ADD TO CART<img src='images/basket.svg' alt='basket'></button>
      </div>`
      );
    });
    const buttonsAdd = document.querySelectorAll(".js_button");
    const total = document.getElementById("total");
    const addedBooks = document.getElementById("added-to-cart");
    let sum = 0;
    total?.insertAdjacentHTML("beforeend", `<div>Total: ${0}$</div>`);
    buttonsAdd.forEach((buttonAdd, index) => {
      buttonAdd.addEventListener("click", function () {
        sum += books[index].price;
        let brought = document.createElement("div");
        brought.innerHTML = `<div class='books-in-cart'>
          <div class='title'>${books[index].title}</div>
          <div class='author'>${books[index].author}</div>
          <img src=${books[index].imageLink} alt='cover' class='cover'>
        </div>
        `;
        addedBooks.insertAdjacentElement("beforeend", brought);
        total.innerHTML = "";
        total?.insertAdjacentHTML("beforeend", `<div>Total: ${sum}$</div>`);
      });
    });
    empty?.addEventListener("click", function () {
      sum += 0;
      total?.insertAdjacentHTML("beforeend", `<div>Total: ${sum}$</div>`);
    });
  }
};
xhr.send();
const bookclub = document.getElementById("join-club");
const info = document.getElementById("info");
const joinBtn = document.querySelector(".join-btn");
const abouts = document.querySelector(".abouts-section");
const form = document.getElementById("registration");
bookclub?.addEventListener("click", function () {
  if (info.style.display === "none") {
    info.style.display = "block";
    joinBtn.style.display = "block";
  } else if (info.style.display !== "none") {
    info.style.display = "none";
    joinBtn.style.display = "none";
  }
});
joinBtn?.addEventListener("click", function () {
  abouts.style.display = "none";
  form.style.display = "block";
});
const patterns = {
  phone: /^\d{9}$/,
  name: /^[a-z]{2,12}$/i,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,10})$/,
};

const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector(".submit");

function validate(field, regex) {
  if (regex?.test(field.value)) {
    field.style.border = "none";
  } else {
    field.style.border = "1px solid red";
  }
}
inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    validate(e.target, patterns[e.target.attributes.name.value]);
  });
});
