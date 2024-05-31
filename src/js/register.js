// Import our custom CSS
import '../scss/style.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

const formulario = document.querySelector("form")
const nombre = document.querySelector("#name")
const apellido = document.querySelector("#apellido")
const email = document.querySelector("#email")
const contrasena = document.querySelector("#password")
const confirmarContrasena = document.querySelector("#confirmPassword")
const boton = document.querySelector(".boton")

function verifyPassword () {
    if (contrasena.value === confirmarContrasena) {
        return true
    } else {
        false
    }
}

async function validarCorreo(email) {
    const response = await fetch(`http://localhost:3000/usuarios?email=${email.value}`)
    const data =  await response.json()

    if(data.length === 0) {
        return true
    } else {
        false
    }
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault()
})

boton.addEventListener("submit", () => {
    if () {
        
    }
})