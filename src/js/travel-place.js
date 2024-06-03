const form = document.querySelector("form")
const nombre = document.querySelector("#name")
const ciudad = document.querySelector("#city")
const url = document.querySelector("#url")
const boton = document.querySelector(".btn")
const apiUrl = "http://localhost:3000/travelPlaces"
const tbody = document.querySelector('tbody')

let activeUser = null
let travelPlaceId = undefined

function loginGuard() {
    const user = localStorage.getItem('userOnline')
    if (user === null) {
        window.location.href = 'http://localhost:5173/'
        return
    }
    activeUser = JSON.parse(user)
}


// DOMCon... se ejecuta cuando todo el contenido se cargo en el navegador
window.addEventListener('DOMContentLoaded', () => {
    loginGuard()
    pintarTabla()
})

tbody.addEventListener('click', async function (event) {
    // ACA DEBEMOS LOCALIZAR A LOS ESCUCHADORES DE EVENTOS
    if (event.target.classList.contains("btn-danger")) {
        travelPlaceId = event.target.getAttribute("data-id")
        await deleteItem(travelPlaceId)
        await pintarTabla()
    }
    if (event.target.classList.contains("btn-warning")) {
        travelPlaceId = event.target.getAttribute("data-id")
        await findTravelPlace(travelPlaceId);
        
    }
})

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    if (nombre.value === "" || ciudad.value === "" || url.value === "") {
        alert("debe completar todos los campos")
        return
    }

    const newTravel = {
        name: nombre.value,
        city: ciudad.value,
        url: url.value,
        idUser: activeUser.id
    }
    if(travelPlaceId === undefined) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTravel)
        })
    
        if (response.ok) { //con esta propiedad sabemos asi la peticion se hizo bien o no 
            alert("se guardo correctamente")
            form.reset()
            nombre.focus()
            pintarTabla()
        }
    } else {
        const response = await fetch(`${apiUrl}/${travelPlaceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTravel)
        })
    
        if (response.ok) { //con esta propiedad sabemos asi la peticion se hizo bien o no 
            alert("se actualizo correctamente")
            form.reset()
            nombre.focus()
            pintarTabla()
            travelPlaceId = undefined
        }
    }
})



async function pintarTabla() {
    const response = await fetch(apiUrl)
    if (response.ok === false) {
        alert("no se trajeron los datos")
        return
    }

    const data = await response.json()
    tbody.innerHTML = ""
    data
        .filter(element => element.idUser === activeUser.id)
        .forEach(element => {
            tbody.innerHTML += `
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.city}</td>
            <td>${element.url}</td>
            <td>
                <button type="button" data-id=${element.id} class="btn btn-warning">Edit</button>
                <button type="button" data-id=${element.id} class="btn btn-danger">Delete</button>
            </td>
        `
        })
}

async function deleteItem(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        alert('Registro borrado correctamente')
    }
}

async function findTravelPlace(id) {
    const response = await fetch(`${apiUrl}/${id}`)
    if (response.ok === false) {
        alert('NO LO ENCONTRO')
        return
    }

    const data = await response.json()
    nombre.value = data.name
    ciudad.value =  data.city
    url.value = data.url
}