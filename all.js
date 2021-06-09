document.addEventListener("DOMContentLoaded", function () {
    const animalListElm = document.querySelector(".alledyr")
    //const
    const animalfooter = document.querySelector(".navigation")

    if (animalListElm) {

        let url = new URLSearchParams(window.location.search)

        // let offset;
        // if (url.get("offset")) {
        //     offset = url.get("offset")
        // }else {
        //     offset = 0
        // }

        let offset = url.get("offset") ? url.get("offset") : 0;
        console.log(typeof (offset))
        let nextOffset;
        let prevOffset;

        function deleteAnimal(e) {
            let animalId = e.target.dataset.id

            fetch(`http://gaya-myapi.herokuapp.com/api/v1/animals/${animalId}`, {
                "method": "DELETE",
                "header": {
                    "Authorization": "Bearer fnjkdsbgkfjgslikgjpsogjiodghbjdkgjswropaglkf"
                }
            })
                .then(response => console.log(response))
                .then(function () {
                    window.location.reload()
                })
                .catch(err => console.log(err));
        }

        // function deleteModal(e) {
        //     overlay.style.display = "block"

        //     cancelBtn.addEventListener("click", function() {
        //         overlay.style.display= "none";
        //         cancelBtn.removeEventListener("click", function() {})
        //     })
        // }

        // ****************************

        fetch(`http://gaya-myapi.herokuapp.com/api/v1/animals?offset=${offset}`)

            .then(response => response.json())
            .then(data => {
                console.log(data)

                let maxOffset = data.count - data.count % 5;
                console.log(maxOffset)

                nextOffset = offset >= maxOffset ? maxOffset : parseInt(offset) + 5
                prevOffset = offset <= 0 ? 0 : parseInt(offset) - 5;

        //*******************************     

                data.result.forEach(animal => {

                    let li = document.createElement('li')
                    li.classList.add("animallist_item")

                    li.innerHTML = ` 
                       <div class="span">
                       <span class="animallist_name">${animal.name}</span>
                       <span class="animallist_type">${animal.type}</span>
                       </div>
                       <div class = "ahref">
                            <a href = "single.html?animalid=${animal._id}">Detajler</a>
                            <a href = "update.html?animalid=${animal._id}">Opdater</a>                   
                            
                            <button class="deleteBtn" data-id=${animal._id}>Delete</button>
                       </div>
                        `
                    animalListElm.appendChild(li)
                })

                let prev = document.createElement("a");
                prev.setAttribute("href", `/all.html?offset=${prevOffset}`)
                let prevNode = document.createTextNode("Previous")
                prev.appendChild(prevNode)
                animalfooter.appendChild(prev)

                let next = document.createElement("a");
                next.setAttribute("href", `/all.html?offset=${nextOffset}`)
                let nextNode = document.createTextNode("Next")
                next.appendChild(nextNode)
                animalfooter.appendChild(next)
            })

            .then(() => {
                let deleteButtons = document.querySelectorAll(".deleteBtn")
                deleteButtons.forEach(button => {
                    button.addEventListener("click", deleteAnimal)
                })
            })
    }
})




