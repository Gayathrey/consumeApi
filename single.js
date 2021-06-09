document.addEventListener("DOMContentLoaded", function() {

    let url= new URLSearchParams(window.location.search)

    let animalId = url.get("animalid");
    console.log(animalId)

    let containerElm = document.querySelector(".animalContainer")
    console.log(containerElm)

    fetch(`http://gaya-myapi.herokuapp.com/api/v1/animals/${animalId}`)
    .then (response => response.json())
    .then(data =>{
        console.log(data)

        let div = document.createElement("div")
        
        div.innerHTML  = `
            <h2>Detajler om ${data.name}:</h2>
            <p>${data.name} er en ${data.type}</p>
            <p>af racen ${data.breed}</p>
            <p>${data.name} er ${data.age} år gammel.</p>
            <p>${data.name} er en ${data.sex}</p>
            <p>${data.name} er ${data.colors}</p>
        `
       containerElm.append(div)
    
            
    })
})