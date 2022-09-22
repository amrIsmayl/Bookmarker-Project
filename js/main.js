
//global
var siteName = document.getElementById("nameBook");
var siteurl = document.getElementById("urlSite");
var tableRow = document.getElementById("tableRow");
var btn = document.getElementById('btn');
var searchInput = document.getElementById("search");
var updateBtn = document.getElementById("updateBtn");
var bookMarker;
var upd;

(function () {

    if (localStorage.getItem("data1") == null) {
        bookMarker = [];
    } else {
        bookMarker = JSON.parse(localStorage.getItem("data1"));
        display(bookMarker);
    }
})();

function addProduct() {
    var Product = {
        name: siteName.value,
        url: siteurl.value,
    };

    bookMarker.push(Product);
    localStorage.setItem("data1", JSON.stringify(bookMarker));
    display(bookMarker)
    showMessage()
    clearForm()
}


function display(list) {
    var box = ``;
    for (var i = 0; i < list.length; i++) {
        box += `<div class=" row py-4 my-2 row_table">
        <div class=" col-lg-6">
            <h2 class=" fs-4 fw-bold ">${list[i].name}</h2>
        </div>
        <div class="  col-lg-6">
            <a class=" btn btn-primary me-2 " href="${list[i].url}" target="_blank" >visit</a>
            <button onclick=delFun(${i}) class=" btn btn-danger btndelete me-2">Delete</button>
            <button onclick=formUpdate(${i}) class="btn btn-primary">update</button>
        </div>
    </div>`;
    }

    tableRow.innerHTML = box
}


function delFun(index) {
    bookMarker.splice(index, 1);
    localStorage.setItem("data1", JSON.stringify(bookMarker));
    display(bookMarker);
}

function clearForm() {
    siteName.value = "";
    siteurl.value = "";
}



function showMessage() {

    var name = siteName.value;
    var val = name.slice(1, name.length);
    var isUpper = (string) => /[A-Z]{1,}/.test(string);
    var letterLength = (string) => /^[a-z]{11,}[0-9]{0,}$/.test(string);
    var space = (string) => / {1,}/.test(string);
    var numberLength = (string) => /^[A-Za-z]{0,}[0-9]{4,}$/.test(string);
    var numberPosition = (string) => /[A-Za-z]{0,}[0-9]{1,}[A-Za-z]/.test(string);
    var Alphanumeric = (string) => /[=\-)(*&^%$#@!~*\/+\\\|_.]/.test(string);
    var alpha = /[=\-)(*&^%$#@!~*\/+\\\|_.]/;
    var AlphanumericMatch = name.match(alpha);
    if (name == '') {
        alert('you shouid enter product name');
    }
    else if (Alphanumeric(name)) {
        alert(`Not allowed to add ${AlphanumericMatch}`);
    }
    else if (numberPosition(name)) {
        alert('The numbers should be at the end of the word');
    }
    else if (space(name)) {
        alert('There should be no spaces');
    }
    else if (name[0].toUpperCase() != name[0]) {
        alert('you shouid start with upper case');
    }
    else if (isUpper(val)) {
        alert('Only the first letter must be a capital');
    }
    else if (letterLength(val)) {
        alert('The number of letters should not exceed 11 letters');
    }
    else if (numberLength(name)) {
        alert('The number of numbers must not exceed three digits');
    }
}



function searchProducts() {
    term = searchInput.value;

    searchResult = [];

    for (var i = 0; i < bookMarker.length; i++) {
        if (bookMarker[i].name.toUpperCase().includes(term.toUpperCase()) === true) {
            searchResult.push(bookMarker[i]);
        }
    }
    display(searchResult);
    console.log(searchResult)
}


function formUpdate(updateForm) {
    upd = updateForm

    siteName.value = bookMarker[updateForm].name
    siteurl.value = bookMarker[updateForm].url


    updateBtn.classList.replace('d-none', 'd-inline-block');
    btn.classList.add('d-none')
}

function updateFun() {
    var Product = {
        name: siteName.value,
        url: siteurl.value,
    };

    bookMarker.splice(upd, 1, Product);

    localStorage.setItem("data", JSON.stringify(bookMarker));
    display(bookMarker);
    clearForm()
    updateBtn.classList.add('d-none');
    btn.classList.replace('d-none', 'd-inline-block')
}