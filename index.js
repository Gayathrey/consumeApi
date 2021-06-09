let form = document.querySelector("#createanimal")

let submitAnimal = function(e) {
    e.preventDefault()
    console.log(e.target.type.value)

    const myformdata = new FormData();
    myformdata.append("type", e.target.type.value);
    myformdata.append("breed", e.target.breed.value);
    myformdata.append("name", e.target.name.value);
    myformdata.append("age", e.target.age.value);
    myformdata.append("sex", e.target.sex.value);
    myformdata.append("colors", e.target.colors.value);
    console.log(myformdata)
}



fetch (
    "https://gaya-myapi.herokuapp.com/api/v1/animals", {
        "method": "GET",
        "headers": {
            "Content-Type": "multipart/form-data",
        "Authorization": "Bearer fnjkdsbgkfjgslikgjpsogjiodghbjdkgjswropaglkf"
    },

    // "body": myformdata

})

.then(response => response.json())
.then(result => console.log(result))
.catch(err => console.error(err));

form.addEventListener("submit", submitAnimal)