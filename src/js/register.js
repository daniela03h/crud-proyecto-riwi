const form = document.querySelector("form")
const nameUser = document.querySelector("#name");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const url = "http://localhost:3000/user"

// Validamos que las contraseñas sean iguales
function validatePassword(password, confirmPassword){
    if(password.value == confirmPassword.value){
        return true
    } else{
        alert("No coincide la contraseña")
        return false
    }
}

// Validar que el email ya exitse 
async function validateEmail (email){
    const response = await fetch (`${url}?email=${email.value}`); // Se busca en la base datos si el email ya existe
    const data = await response.json();
    if(data.length === 0){
        return true
    }else {
        alert("El correo ya está registrado")
        return false
    }
}
// Funcion para crear el usuario
async function createUser (nameUser, lastName, email, password){
    // "Molde" de usuario
    const newUser = {
        nameUser: nameUser.value,
        lastName :lastName.value,
        email: email.value,
        password: password.value
    }
    // Se agrega usuario a la base de datos.
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
}

form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const checkPassword = validatePassword(password, confirmPassword);
    const checkEmail = await validateEmail(email);
    if(checkPassword && checkEmail){
        await createUser(nameUser, lastName, email, password);
        alert("Se creo usuario")
        window.location.href = "./index.html"
    }
    else{
        alert("No se pudo agregar los datos");
        location.reload();
    }
})