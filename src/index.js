const ramenMenu = document.querySelector("#ramen-menu")
const ramenInfo = document.querySelector("#ramen-detail")
const ramenForm = document.querySelector("#ramen-rating")
const ramenImg = document.querySelector("#ramen-img")
const newRamenForm = document.querySelector("#new-ramen")

 fetch("http://localhost:3000/ramens")
 .then(resp => resp.json())
 .then(ramenObjs => {
     console.log(ramenObjs)
     ramenObjs.forEach(addRamenToMenu)
 })

 function addRamenToMenu(ramen){
    let ramenImg = document.createElement("img")
    ramenImg.src = ramen.image
    ramenImg.id = "ramen-img"
    ramenImg.dataset.id = ramen.id
    ramenMenu.append(ramenImg)
}

ramenMenu.addEventListener("click", function(event){
    if(event.target.matches("#ramen-img")){
        let id = event.target.dataset.id
        fetch(`http://localhost:3000/ramens/${id}`)
        .then(resp => resp.json())
        .then(ramenObj => {
            console.log(ramenObj)
            addRamenImg(ramenObj)
            addRamenForm(ramenObj)
        })
    }
})

function addRamenImg(ramenObj){

    ramenInfo.innerHTML = `
      <img class="detail-image" src=${ramenObj.image} alt=${ramenObj.name} />
      <h2 class="name">${ramenObj.name}</h2>
      <h3 class="restaurant">${ramenObj.restaurant}</h3>
    `
}

function addRamenForm(ramenObj){
    ramenForm.innerHTML = `
    <label for="rating">Rating: </label>
    <input type="text" name="rating" id="rating" value=${ramenObj.rating} />
    <label for="comment">Comment: </label>
    <textarea name="comment" id="comment">${ramenObj.comment}</textarea>
    <input type="submit" value="Update" />
    `
    ramenForm.dataset.id = ramenObj.id
}

ramenForm.addEventListener("submit", function(event){
    event.preventDefault()
    const newRating = {
        rating: event.target.rating.value,
        comment: event.target.comment.value
    }
    console.log(newRating)
    let id = ramenForm.dataset.id

    fetch(`http://localhost:3000/ramens/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newRating)
    })
    .then(resp => resp.json())
    .then(newRating => addRamenForm(newRating))
})

document.addEventListener('DOMContentLoaded', (event) => {
    fetch(`http://localhost:3000/ramens/1`)
    .then(resp => resp.json())
    .then(ramenObj => {
        console.log(ramenObj)
        addRamenImg(ramenObj)
        addRamenForm(ramenObj)
    })
});


