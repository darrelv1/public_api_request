/**
 * Template plugin elements
 */
//searchBar
const searchContainer = document.querySelector(".search-container")

//gallery
const gallery = document.getElementById("gallery")

//body
const body = document.querySelector("body")



/**
 * Templates
 */
const search_Markup =
    ` <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`


const gallery_Markup =
    `<div class="card">
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

//Append gallery markup to the gallery div
gallery.insertAdjacentHTML("beforeend", gallery_Markup)
gallery.insertAdjacentHTML("beforeend", gallery_Markup)
gallery.insertAdjacentHTML("beforeend", gallery_Markup)
gallery.insertAdjacentHTML("beforeend", gallery_Markup)
gallery.insertAdjacentHTML("beforeend", gallery_Markup)
gallery.insertAdjacentHTML("beforeend", gallery_Markup)

//Append Modalmarkup on to the body
//body.insertAdjacentHTML("beforeend", modal_Markup)