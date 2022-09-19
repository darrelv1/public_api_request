/**
 * Template plugin elements
 */
//searchBar
const searchContainer = document.querySelector(".search-container")

//gallery
const gallery = document.getElementById("gallery")

//body
const body = document.querySelector("body")

//container API data container
let cardContainer = []

/**
 * Constants
 */
const DATA = {
    STARTUP_EMPLOYEES: 11,
    APIURL: "https://randomuser.me/api/"
}



/**
 * Templates
 */
const search_Markup =
    ` <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`


const gallery_Markup =
    `
    <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">first last</h3>
                <p class="card-text">email</p>
                <p class="card-text cap">city, state</p>
            </div>
    </div>
    `

const modal_Markup =
    `
              <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>
    `

const modal_btn_Markup =
    `
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `

/**
 * Templates plugins
 */

//Append search markup to the search div
searchContainer.insertAdjacentHTML("beforeend", search_Markup)


//Extract image, first and last name, email and city or location.
function createGalleryUsers(data){
    const name = data.name.first+" "+data.name.last;
    const image = data.picture.thumbnail;
    const city = data.location.city;
    const state = data.location.state;
    const email = data.email;

    let html =`
           <div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${image} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id=${name} class="card-name cap">${name}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
             </div>
    `
    return html
};

function createModal(data){
    const name = data.name.first+" "+data.name.last;
    const image = data.picture.thumbnail;
    const city = data.location.city;
    const state = data.location.state;
    const email = data.email;
    let html =
        `
              <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${name}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${city}</p>
                        <hr>
                        <p class="modal-text">${state}</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>
    `
}

/**
 * API Request
 */

//resolve or reject validator
function checkStatus(req){
    if (req.ok){
        return Promise.resolve(req)
    } else {
        return Promise.reject(new Error(req.statusText))
    }
};

// Request are checked, converted to JSON and error handled
function fetchData(url){
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log("API not working!", error))
};

//string container to house all the employees at the start of the app
let startupEmployees = "";

function fetchUserDecorator(url) {
    return fetchData(url)
        .then((message) => {
            const apiData = message['results'][0]
            startupEmployees += createGalleryUsers(apiData);
            const key = apiData.name.first;
            const unit = { key : apiData }
            cardContainer.push(unit);
            return message;
        })
};




//Produce 12 employees
async function startApp ()
{
    for (let i = 0; i <= DATA.STARTUP_EMPLOYEES; i++) {
        await fetchUserDecorator(DATA.APIURL)
    }
    gallery.insertAdjacentHTML("beforeend", startupEmployees)
}


/**
 * EventListeners
 */

gallery.addEventListener("click",  (e) => {
    let card = e.target
    const regexTag = /^DIV$/
    const regexClass = /^card$/
    let condition = true;

    while (condition){
        card = card.parentElement;
        if(regexTag.test(card.tagName) && regexClass.test(card.className)) {
            condition = false;
        }
    }
    const name = card.querySelector("h3").id

})




startApp();
