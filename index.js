  //Implement Your Code Here
const menu = document.querySelector("#burger-menu")
const order = document.querySelector("#order-list")
const form = document.querySelector("#custom-burger")
const url = "http://localhost:3000/burgers"

const fetchBurgers = _ => {
  fetch(url)
  .then( r => r.json() )
  .then( burgers => {
    for (burger of burgers) {
      renderBurger(burger)
    }
  })
}

const renderBurger = burger => {
//   <div class="burger">
//   <h3 class="burger_title">Good Burger</h3>
//     <img src="https://www.lovelesscafe.com/uploads/recipeimages/BBQBaconBurger-web.jpg">
//     <p class="burger_description">
//       What a Good Burger!
//     </p>
//     <button class="button">Add to Order</button>
// </div>

  let card = document.createElement("div")
  card.className = "burger"
  card.dataset.id = burger.id

  let title = document.createElement("h3")
  title.className = "burger_title"
  title.textContent = burger.name 

  let img = document.createElement("img")
  img.src = burger.image 
  img.alt = burger.name
  
  let desc = document.createElement("p")
  desc.className = "burger_description"
  desc.textContent = burger.description

  let orderButton = document.createElement("button")
  orderButton.className = "button"
  orderButton.textContent = "Add to Order"

  card.append(title, img, desc, orderButton)
  
  menu.append(card)
}

fetchBurgers()

const addToOrder = id => {
  fetch(url+`?id=${id}`)
  .then (r => r.json() )
  .then ( burger => {
    let li = document.createElement("li")
    li.dataset.id = burger[0].id
    li.textContent = burger[0].name
    order.append(li)
  })
}

const createBurger = e => {
  e.preventDefault()

  let formData = {
    name: e.target[0].value,
    description: e.target[1].value,
    image: e.target[2].value
  }

  let config = {
    "method":"POST",
    "headers": {
      "Content-type":"application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(url, config)
  .then( r => r.json() )
  .then(newBurger => {
    renderBurger(newBurger)
    addToOrder(newBurger.id)
  })

}


const handleClicks = e => {
  switch (true){
    case (e.target.className === "button"):
      addToOrder(e.target.closest(".burger").dataset.id)
      break
  }
}

menu.addEventListener('click', handleClicks)
form.addEventListener('submit', createBurger)

