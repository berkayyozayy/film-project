
// Elementleri Secmek
const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");



//UI Objesini baslatiyoruz.
const ui = new UI();
//Storage Objesi Olusturma
const storage = new Storage();

eventListeners();

function eventListeners(){

    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);

    });

    secondCardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);

}

function addFilm(e){

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if( title === "" || director === "" || url === ""){
        //Hata
        ui.displayMessages("Tum Alanlari Doldurunuz","danger");

    }else{ //Yeni Film Ekleme
        
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm); // arayuze film ekleme
        storage.addFilmToStorage(newFilm); //storage a film eklmee
        ui.displayMessages("Film Basarili Bir Sekilde Eklendi","success");
    }

    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();

}

function deleteFilm(obj){

    if( obj.target.id == "delete-film"){
        ui.deleteFilmFromUI(obj.target);
        storage.deleteFilmFromStorage(obj.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        
        ui.displayMessages("Silme Islemi Basarili","success");
    }
}

function clearAllFilms(){

    if( confirm("Tum Filmleri Silmek Istiyor Musunuz?"));
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
}
