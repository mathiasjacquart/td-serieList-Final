const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("input");

// modification : il faut ajouter une clé de type booléen
const series = [
  {
    name: "Breaking Bad",
    seen: false,
    edit: false,
  },
  {
    name: "The Wire",
    seen: true,
    edit: false,
  },
];

// tableau image
const images = [
  "the shield",
  "the walking dead",
  "better call saul",
  "black mirror",
  "breaking bad",
  "broadchurch",
  "bureau des legendes",
  "game of thrones",
  "homeland",
  "lost",
  "mad men",
  "narcos",
  "sex education",
  "peaky blinders",
  "rectify",
  "sherlock",
  "sons of anarchy",
  "soprano",
  "stranger things",
  "the wire",
  "vikings",
];
// affichage btn vu, à voir, toutes les séries

const btnSeen = document.querySelector("#seen")
const btnGottaSee = document.querySelector("#gottasee")
const btnAllSerie = document.querySelector("#allserie")


btnSeen.addEventListener("click", () => {
  const seenSeries = series.filter((serie) => serie.seen);
  displayFilteredSeries(seenSeries);
});

btnGottaSee.addEventListener("click", () => {
  const gottaSeeSeries = series.filter((serie) => !serie.seen);
  displayFilteredSeries(gottaSeeSeries);
});

btnAllSerie.addEventListener("click", () => {
  displaySeries();
});

const displayFilteredSeries = (filteredSeries) => {
  const seriesNode = filteredSeries.map((serie, index) => {
    if (serie.edit) { 
      return displayInput(serie.name, index);
    }
    return createSerieElement(serie, index);
   
  });
  console.log(seriesNode);
  ul.innerHTML = "";
  ul.append(...seriesNode);
};
// affichage images lors du survol du li 

const div = document.createElement("div")
const img = document.createElement("img")
img.classList.add("image-container")
const body = document.querySelector("body")
body.append(div)
div.append(img)


const serieImage = {};
images.map((image, index) => {
  const imageName = image
  const imagePath = `img/${imageName}.jpg`
  serieImage[image] = imagePath;
  
  })



ul.addEventListener("mouseover", (event) => {
  const serieName = event.target.innerText.trim().toLowerCase();
  console.log(serieImage[serieName]);
  const serieImagePath = serieImage[serieName];
  console.log(serieImagePath);
  if (serieImagePath) {
    img.src = serieImagePath;
  } else {
    img.src = "img/streaming.jpg";
  }
});




const displaySeries = () => {
  const seriesNode = series.map((serie, index) => {
    // placer une condition selon l'état de la nouvelle clé
    if (serie.edit) { 
      return displayInput(serie.name, index)
    }
    return createSerieElement(serie, index)
  });
  ul.innerHTML = "";
  ul.append(...seriesNode);
};
// gestion d'erreur
form.addEventListener("submit", (event, index) => {
  event.preventDefault();
  const value = input.value.trim(); 
  if (value === "") {
    const div = document.querySelector(".error-message");
    console.log(div);
    div.innerText = 'Aucune Saisie';
    div.classList.add("error-text");
    return;
  }
  const existingSerie = series.findIndex(
    (serie) => serie.name.toLowerCase() === value.toLowerCase()
  );
  if (existingSerie !== -1) {
    const div = document.querySelector(".error-message");
    div.innerText = 'Cette série existe déjà';
    div.classList.add("error-text");
    return;
  }
  addSerie(value);
});

// créer une méthode qui affiche un input avec le nom de la série et 2 boutons cancel et save
const displayInput= (value, index) => {
  const li = document.createElement("li");
  const inputEdit = document.createElement("input");
  const btnCancel = document.createElement("button");
  const btnSave = document.createElement("button");
  btnCancel.classList.add("button");
  btnSave.classList.add("button");
  inputEdit.classList.add("input");
  inputEdit.value = value

  btnSave.innerText = "Save";
  btnCancel.innerText = "Cancel";

  btnCancel.addEventListener("click", () => {
    toggleEdit(index); 
    displaySeries()
  });

  btnSave.addEventListener("click", () => {
    const value = inputEdit.value.trim();
    if (value === "") {
      const div = document.querySelector(".error-message");
      console.log(div);
      div.innerText = 'Veuillez écrire à nouveau votre série';
      div.classList.add("error-text");
      return;
    }
    const existingSerie = series.findIndex(
      (serie) => serie.name.toLowerCase() === value.toLowerCase()
    );
    if (existingSerie !== -1) {
      const div = document.querySelector(".error-message");
      div.innerText = 'Cette série existe déjà';
      div.classList.add("error-text");
      return;
    }

    editSerieName(index, inputEdit.value);
  });

  li.append(inputEdit, btnCancel, btnSave);
  return li;
};

function createSerieElement(serie, index) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.classList.add("todo");
  span.addEventListener("click", () => {
    toggleSerie(index);
  });
  if (serie.seen) {
    span.classList.add("done");
  }
  const p = document.createElement("p");
  p.innerText = serie.name;
  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Edit";
  btnEdit.classList.add = "button";
  btnEdit.addEventListener("click", () => {
    toggleEdit(index);
    displaySeries()

  });
  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Delete";
  btnDelete.classList.add("delete");
  btnDelete.addEventListener("click", () => {
    deleteSerie(index);
  });
  li.append(span, p, btnEdit, btnDelete);
  return li;
}

const addSerie = (value) => {
  series.push({ name: value, seen: false });
  displaySeries();
};

const deleteSerie = (index) => {
  console.log(index);
  series.splice(index, 1);
  displaySeries();
};
const toggleSerie = (index) => {
  console.log(index);
  series[index].seen = !series[index].seen;
  displaySeries();
};

// modification
// Créer une méthode qui switche la nouvelle clé du tableau : voir juste ci-dessus
const toggleEdit = (index) => {
  series[index].edit = !series[index].edit
  console.log(index);
}
// Créer une méthode qui va prendre en charge la modification
// modifier le nom

const editSerieName = (index, newName) => {
  series[index].name = newName; 
  series[index].edit = false; 
  displaySeries(); 
};


displaySeries();
