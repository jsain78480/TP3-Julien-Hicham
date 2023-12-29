const divEnsea = document.querySelector(".div-ensea")

const listFilms = [
	{
		title: "Star wars 1",
		year: 1999,
		imageUrl:
			"https://www.papierspeintsdirect.com/media/cache/produits/p/a/papier_peint_panoramique_komar_026_dvd4_2000x1250.jpg",
	},
	{
		title: "Die Hard 1 piege de cristal",
		year: 1988,
		imageUrl:
			"https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
	},
	{
		title: "La colline a des yeux 1",
		year: 1977,
		imageUrl:
			"https://fr.web.img3.acsta.net/pictures/16/10/18/14/19/345735.jpg",
	},
	{
		title: "Mission impossible 1",
		year: 1996,
		imageUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiwT_xH1G_sQ0hxbs1XUqRte2zPfBxMtQ9sw&usqp=CAU",
	},
]

listFilms.forEach((film, index) => {
	divEnsea.innerHTML += `
                <div class="col">
                    <article class="card shadow-sm">
                            <img src="${film.imageUrl}" class="card-img-top" alt="...">
                            <div class="card-body">
                               <h5 class="card-title">${film.title}</h5>
                               <p  class="card-text">Year: ${film.year}</p>

                               <div class="btn-group">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-dark view"
                                        data-bs-toggle="modal" data-bs-target="#editModal"
                                        data-index="${index}"
                                    >
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-dark edit"
                                        data-bs-toggle="modal" data-bs-target="#editModal"

                                    >
                                        Edit
                                    </button>
                                </div>
                            
                            </div>
                    </article>
                </div>`
})

// global vars modal perties
const modalTitle = document.querySelector("#exampleModalLabel")
const modalBody = document.querySelector(".modal-body")
const modalFooter = document.querySelector(".modal-footer")

// ratraper le buttons avec une classe "view"
const btnViewArray = document.querySelectorAll(".view")

// ratraper le buttons avec une classe "edit"
const btnEditArray = document.querySelectorAll(".edit")

// function pour lancer chaque fois que on click sur le btn "view"
const catchView = (i) => {
	modalTitle.textContent = listFilms[i].title
	modalBody.innerHTML = `<img src="${listFilms[i].imageUrl}" class="img-fluid"  />`
	modalBody.innerHTML += `<p class="mt-2"> Year: ${listFilms[i].year} </p>`
	modalFooter.innerHTML = `
        <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
        >
            Close
        </button>
    `
}

// function pour lancer chaque fois que on click sur le btn "edit"
const catchEdit = (i) => {
	modalTitle.textContent = "Edit Mode"
	modalBody.innerHTML = `
        <form>
            <div class="mb-3">
                <label for="title" class="form-label">Edit Title</label>
                <input type="text" class="form-control" id="title" aria-describedby="title" value="${listFilms[i].title}" >
                <div id="emailHelp" class="d-none form-text">We'll never share your email with anyone else.</div>
            </div>

             <div class="mb-3">
                <label for="year" class="form-label">Edit Year</label>
                <input type="number" class="form-control" id="year" aria-describedby="year" value="${listFilms[i].year}" >
                <div id="emailHelp" class="d-none form-text">We'll never share your email with anyone else.</div>
            </div>

             <div class="mb-3">
                <label for="imageUrl" class="form-label">Edit Image Url</label>
                <input type="text" class="form-control" id="imageUrl" aria-describedby="year" value="${listFilms[i].imageUrl}" >
                <img src="${listFilms[i].imageUrl}" class="img-thumbnail w-50 mt-2" />
                <div id="emailHelp" class="d-none form-text">We'll never share your email with anyone else.</div>
            </div>
    `
	modalFooter.innerHTML = `
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button type="submit" class="btn btn-primary submit" data-bs-dismiss="modal">Save changes</button>
        </form>

    `

	console.log(" clicked edit btn " + i)
}
// rajouter un ecouter de evenment 'click' sur le button view
btnViewArray.forEach((btn, index) => {
	btn.addEventListener("click", () => catchView(index))
})

// rajouter un ecouter de evenment 'click' sur le button edit
btnEditArray.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		catchEdit(index)
		const saveBtn = document.querySelector(".submit")
		saveBtn.addEventListener("click", () => {
			const newTitle = document.querySelector("form").title.value
			const newYear = document.querySelector("form").year.value
			const newImageUrl = document.querySelector("form").imageUrl.value

			/* form validation  */
			if (newTitle === "" || newYear === "" || newImageUrl === "") {
				alert("no empty !!!")
				return
			}
			/* bizarre characters  */
			const regex = /^[a-zA-Z0-9/.:-_ 'éùçà(),-=?&]+$/

			if (
				!regex.test(newTitle) ||
				!regex.test(newYear) ||
				!regex.test(newImageUrl)
			) {
				alert("pas de truc bizzare!")
				return
			}
			/*  save changes  */
			listFilms[index].title = newTitle
			listFilms[index].year = newYear
			listFilms[index].imageUrl = newImageUrl
			document.querySelectorAll(".card-title")[index].innerHTML = newTitle
			document.querySelectorAll(".card-text")[
				index
			].innerHTML = `Year: ${newYear}`

			document.querySelectorAll(".card-img-top")[index].src = newImageUrl
		})
	})
})
