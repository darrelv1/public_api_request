/**
 * Template plugin elements
 */

//search Div
const searchContainer = document.querySelector(".search-container")

//gallery
const gallery = document.getElementById("gallery")

//body
const body = document.querySelector("body")

//container API data container
let cardContainer = []

//employee card selected
let name = "";

//Convert the object to a list to iterate through the object using a the list
let cardContainterKeys = []

/**
 * Constants
 */

const DATA = {
    STARTUP_EMPLOYEES: 12,
    APIURL: "https://randomuser.me/api/?results=12&nat=us",
    VALIDATORS: {
        DOB_REGEX: /(\d{4})-(\d{2})-(\d{2}).*/img,
        REGEXCLASS_ALL : /^card.+/im,
        REGEX_TAG : /^DIV$/,
        REGEXCLASS : /^card$/,
        REGEX_SEARCH : /^[\w]+( [\w]*)?$/im,
    },
    NEXT: 1,
    PREV: -1,
}

/**
 * Helper Functions
 */

//Phone Number Formatter
function numberFormat(text){
    return text.replace(DATA.VALIDATORS.DOB_REGEX, '$2/$3/$1');
}

//Validates if the clicked item belongs to a card
function cardValidator(e){
    return DATA.VALIDATORS.REGEXCLASS_ALL.test(e.target.className);
}


/**
 * Template
 */
const search_Markup =
    ` <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`


/**
 * Templates plugins
 */

//Append search markup to the search div
searchContainer.insertAdjacentHTML("beforeend", search_Markup);

//search bar
let searchBar = document.querySelector("form input[type='search']")

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
    const image = data.picture.medium;
    const city = data.location.city;
    const state = data.location.state;
    const postal = data.location.postcode;
    const email = data.email;
    const cell = data.cell;
    const address = data.location.street.number+" "+ data.location.street.name+", "+city+", "+state+" "+postal;
    const birthday =  numberFormat(data.dob.date);
    let html =
        `
              <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${image} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${name}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${city}</p>
                        <hr>
                        <p class="modal-text">${cell}</p>
                        <p class="modal-text">${address}</p>
                        <p class="modal-text">Birthday: ${birthday}</p>
                    </div>
                </div>
               <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `
    return html
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
            for (let i = 0; i < 12 ; i++) {
                const apiData = message['results'][i]
                startupEmployees += createGalleryUsers(apiData);
                reqEmployeeData(apiData)
            }
            return message;
        })
};

//Stores Request within an object, using a key for later retrieval
function reqEmployeeData (data){
    const key = data.name.first;
    const unit = {[key] : data }
    let newCardContainer = Object.assign(cardContainer, unit)
    cardContainer = newCardContainer;
}

//Fetches 12 employees
async function startApp ()
{
        await fetchUserDecorator(DATA.APIURL)

    cardContainterKeys = Object.keys(cardContainer)
    gallery.insertAdjacentHTML("beforeend", startupEmployees)
}
/**
 * CSS Modifications
 */
const searchCSSbg = () => {
    const cards = document.querySelectorAll('.card');
    for (ele of cards) {ele.style.backgroundColor = '#FFF8DC'};
    body.style.backgroundColor = 'Purple'
    gallery.style.backgroundColor = '#FFA07A';

    document.querySelector('header h1').style.color = "#FFA07A"
}
const defaultCSSbg = () => {
    const cards = document.querySelectorAll('.card');
    for (ele of cards) {ele.style.backgroundColor = 'rgba(245, 245, 245, 0.9)'};
    body.style.backgroundColor = 'rgba(235, 235, 235, 0.9)';
    gallery.style.backgroundColor = 'rgba(235, 235, 235, 0.9)';
    document.querySelector('header h1').style.color = "Black"

}

/**
 * EventListeners
 */

function getActiveName(e) {
        let card = e.target
        let condition = true;

        while (condition) {
            card = card.parentElement;
            if (DATA.VALIDATORS.REGEX_TAG.test(card.tagName) && DATA.VALIDATORS.REGEXCLASS.test(card.className)) {
                condition = false;
            }
        }
        return card.querySelector("h3").id
}

//event handler for clicking on employees
function addModal(activeEle){
        name = getActiveName(activeEle);
        let test = cardContainer[name]
        const html = createModal(test)
        gallery.insertAdjacentHTML("beforeend", html)
}

//closes the modal
const closeModal = () => {
    const currModal = document.querySelector(".modal-container")
    currModal.innerHTML = "";
    currModal.remove()
}

//steps through the cards and displays the selected name
const modalTraverse = (step) => {
    const indexNext = cardContainterKeys.indexOf(name)+step
    if ( 0 <=  indexNext && indexNext <= (cardContainterKeys.length-1)){
        //console.log("in traversal conditional");
        let nextEmployee  = cardContainterKeys[indexNext]
        let employeeData = cardContainer[nextEmployee]
        name = nextEmployee;
        const html = createModal(employeeData)
        gallery.insertAdjacentHTML("beforeend", html)
    }
}
//searches through the card container, and displays matches
function search(searchVal, data) {

    let filterData = "";
    searchCSSbg();
    let tempKeys = [];

    for (let ind = 0; ind < data.length; ind++) {
        const currentName = data[ind]
        const fullName = cardContainer[currentName].name.first+" "+cardContainer[currentName].name.last;

        if (fullName.toLowerCase().includes(searchVal.toLowerCase())) {
            filterData += createGalleryUsers(cardContainer[data[ind]])
            //temporaryCardContainer
            tempKeys.push(cardContainer[currentName].name.first);


        }
    }

    gallery.innerHTML = ""
    gallery.insertAdjacentHTML("beforeend", filterData)
    cardContainterKeys = tempKeys
    return filterData.length
}

//handles the an empty or an active search input field
function searching() {
    const searchInput = searchBar.value;
    if (DATA.VALIDATORS.REGEX_SEARCH.test(searchInput) ) {
        cardContainterKeys = Object.keys(cardContainer);
        const pplFound = search(searchInput, cardContainterKeys)
        if (pplFound === 0) {
            gallery.innerHTML = "No Result Found"
        }
    } else {
        defaultCSSbg()
        gallery.innerHTML = ""
        gallery.insertAdjacentHTML("beforeend", startupEmployees)
        defaultCSSbg()
    }
}
//Actions all the modal interactions
function modalListener(){
    return (e) =>{

        if(cardValidator(e)){
            addModal(e)
        }
        else if(e.target.className === "modal-close-btn" || e.target.parentElement.className === "modal-close-btn" ){
            closeModal();
        }
        else if (e.target.id === "modal-next"){
            closeModal();
            modalTraverse(DATA.NEXT)
        }
        else if (e.target.id === "modal-prev"){
            closeModal();
            modalTraverse(DATA.PREV)
        }
    }
}


document.addEventListener("click", modalListener())

startApp();
searchBar.addEventListener("keyup", searching)