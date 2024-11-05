let rowData = document.getElementById('rowData');
let searchContainer = document.getElementById('searchContainer');
let category = document.getElementById('category');
let area = document.getElementById('area');
let ingredient = document.getElementById('ingredient');
let search = document.getElementById('search');
let contact = document.getElementById('contact-us');
let openCloseIcon = $('.side-nav i.open-close-icon');
let navLinks = $('.side-nav .links li');
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible")
    })
})
//=============function open side-bar=======================
function openSideNav() {
    $('.side-nav').animate({ left: 0 }, 500);
    openCloseIcon.removeClass('fa-align-justify').addClass('fa-x');
    navLinks.eq(0).animate({ top: 0 }, 500);
    navLinks.eq(1).animate({ top: 0 }, 600);
    navLinks.eq(2).animate({ top: 0 }, 700);
    navLinks.eq(3).animate({ top: 0 }, 800);
    navLinks.eq(4).animate({ top: 0 }, 900);
}
//==========================================================
//==============function close side-bar=====================
function closeSideNav() {
    let navLinksOuterWidth = $('.side-nav .nav-links').outerWidth();
    $('.side-nav').animate({ left: -navLinksOuterWidth }, 500);
    openCloseIcon.removeClass('fa-x').addClass('fa-align-justify');
    navLinks.animate({ top: 300 }, 500);
}
closeSideNav();
openCloseIcon.click(function () {
    let sideNavLeft = $('.side-nav').css('left');
    if (sideNavLeft == '0px') {
        closeSideNav();
    }
    else {
        openSideNav();
    }
})
//==========================================================
//================function Display Meals====================
function displayMeals(arr) {
    let Box = ``;
    for (let i = 0; i < arr.length; i++) {
        Box += ` <div class="col-md-3">
                            <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative rounded-2 overflow-hidden cursor-pointer">
                                <img class=" w-100" src="${arr[i].strMealThumb}" alt="">
                                <div class="layer position-absolute d-flex align-items-center text-black p-2">
                                    <h3>${arr[i].strMeal}</h3>
                                </div>
                            </div>
                    </div>`
    }
    rowData.innerHTML = Box;
}
category.addEventListener('click',
    async function getCategories() {
        closeSideNav();
        rowData.innerHTML = '';
        $('.inner-loading').fadeIn(300);
        searchContainer.innerHTML = '';
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let data = await response.json();
        console.log(data.categories);
        displayCategories(data.categories);
        $('.inner-loading').fadeOut(300);
    }
)
//==========================================================
//===============function Display Categories================
function displayCategories(arr) {
    let Box = ``;
    for (let i = 0; i < arr.length; i++) {
        Box += ` <div class="col-md-3">
                            <div onclick ="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative rounded-2 overflow-hidden cursor-pointer">
                                <img class=" w-100" src="${arr[i].strCategoryThumb}" alt="">
                                <div class="layer position-absolute text-center text-black p-2">
                                    <h3>${arr[i].strCategory}</h3>
                                    <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                                </div>
                            </div>
                    </div>`
    }
    rowData.innerHTML = Box;
}
//==========================================================
area.addEventListener('click',
    async function getArea() {
        closeSideNav();
        rowData.innerHTML = '';
        $('.inner-loading').fadeIn(300);
        searchContainer.innerHTML = '';
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let data = await response.json();
        displayArea(data.meals);
        $('.inner-loading').fadeOut(300);
    }
)
//==========================================================
//================function dDisplay Area====================
function displayArea(arr) {
    let Box = ``;
    for (let i = 0; i < arr.length; i++) {
        Box += ` <div class="col-md-3">
                            <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                                <i class="fa-solid fa-house-laptop fa-4x"></i>
                                <h3>${arr[i].strArea}</h3>
                            </div>
                    </div>`
    }
    rowData.innerHTML = Box;
}
ingredient.addEventListener('click',
    async function getIngrediant() {
        closeSideNav();
        rowData.innerHTML = '';
        $('.inner-loading').fadeIn(300);
        searchContainer.innerHTML = '';
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let data = await response.json();
        displayIngrediant(data.meals.slice(0, 20));
        $('.inner-loading').fadeOut(300);
    }
)
//==========================================================
//==================function Display Ingrediant=============
function displayIngrediant(arr) {
    let Box = ``;
    for (let i = 0; i < arr.length; i++) {
        Box += ` <div class="col-md-3">
                            <div onclick="getIngrediantsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                                <h3>${arr[i].strIngredient}</h3>
                                <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                            </div>
                    </div>`
    }
    rowData.innerHTML = Box;
}
//==========================================================
//===============function get Category of Meals=============
async function getCategoryMeals(category) {
    rowData.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let data = await response.json();
    displayMeals(data.meals.slice(0, 20));
    $('.inner-loading').fadeOut(300);
}
//==========================================================
//===================function get Area of Meals=============
async function getAreaMeals(area) {
    rowData.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data = await response.json();
    displayMeals(data.meals.slice(0, 20));
    $('.inner-loading').fadeOut(300);
}
//==========================================================
//==============function get Ingrediants of Meals===========
async function getIngrediantsMeals(ingredient) {
    rowData.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    let data = await response.json();
    displayMeals(data.meals.slice(0, 20));
    $('.inner-loading').fadeOut(300);
}
//==========================================================
//==================function get Meal Details===============
async function getMealDetails(id) {
    closeSideNav();
    rowData.innerHTML = '';
    $('.inner-loading').fadeIn(300);
    searchContainer.innerHTML = '';
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = await response.json();
    displayMealDetails(data.meals[0]);
    $('.inner-loading').fadeOut(300);
}
//==========================================================
//==================function Display Meal Details===========
function displayMealDetails(meal) {
    searchContainer.innerHTML = '';
    let ingredient = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredient += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(',');

    if (!tags) {
        tags = [];
    }

    let tagsStr = ``;

    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-warning m-2 p-1">${tags[i]}</li>`
    }

    let Box = `<div class="col-md-4">
                <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-3">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredient}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>
                <a target="_blank" href="${meal.strSource}"
                    class="btn btn-success me-2">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
    rowData.innerHTML = Box;
}
search.addEventListener('click',
    function showSearchInputs() {
        closeSideNav();
        searchContainer.innerHTML = `<div class="row py-4">
                                <div class="col-md-6">
                                    <input onkeyup="searchByName(this.value)" type="text" class="form-control text-white" placeholder="Search By Name">
                                </div>
                                <div class="col-md-6">
                                    <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" type="text" class="form-control text-white" placeholder="Search By First Letter">
                                </div>
                            </div>`
        rowData.innerHTML = '';
    });
//==========================================================
//=================function Search By Name==================
async function searchByName(term) {
    $('.inner-loading').fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let data = await response.json();
    data.meals ? displayMeals(data.meals) : rowData.innerHTML = `<h2 class="text-center text-danger">No Data Found</h2>`;
    $('.inner-loading').fadeOut(300);
}
//==========================================================
//==============function Search By First Letter=============
async function searchByFirstLetter(term) {
    $('.inner-loading').fadeIn(300);
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    let data = await response.json();
    data.meals ? displayMeals(data.meals) : displayMeals([]);
    $('.inner-loading').fadeOut(300);
}
contact.addEventListener('click',
    function showContact() {
        closeSideNav();
        rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input onkeyup="validationInputs()" id="nameInput" type="text" class="form-control"
                        placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validationInputs()" id="emailInput" type="email" class="form-control"
                        placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validationInputs()" id="phoneInput" type="text" class="form-control"
                        placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validationInputs()" id="ageInput" type="number" class="form-control"
                        placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validationInputs()" id="passwordInput" type="password" class="form-control"
                        placeholder="Enter Your password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="validationInputs()" id="repasswordInput" type="password" class="form-control"
                        placeholder="Enter Your Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword
                    </div>
                </div>
            </div>
            <button disabled class="btn btn-outline-danger px-2 mt-4" id="submitBtn">Submit</button>
        </div>
    </div>`
        submitBtn = document.getElementById("submitBtn");

        document.getElementById("nameInput").addEventListener("focus", () => {
            nameInputTouched = true
        })

        document.getElementById("emailInput").addEventListener("focus", () => {
            emailInputTouched = true
        })

        document.getElementById("phoneInput").addEventListener("focus", () => {
            phoneInputTouched = true
        })

        document.getElementById("ageInput").addEventListener("focus", () => {
            ageInputTouched = true
        })

        document.getElementById("passwordInput").addEventListener("focus", () => {
            passwordInputTouched = true
        })

        document.getElementById("repasswordInput").addEventListener("focus", () => {
            repasswordInputTouched = true
        })
    });
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
//==========================================================
//=================function validation of Inputs============
function validationInputs() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }

    if (emailInputTouched) {
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
        }
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}
function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}
function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}
function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}