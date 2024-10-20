const apikey = "def95e063c28b4c1f0b98de2c46f88a8";
const baseUrl = "https://api.themoviedb.org/3";
const popularFilm = `${baseUrl}/movie/popular?api_key=${apikey}`;
const upcomingFilms = `${baseUrl}/movie/upcoming?api_key=${apikey}`;
const topratedFilms = `${baseUrl}/movie/top_rated?api_key=${apikey}`;
const moviesWrapper = document.querySelector(".movies-wrapper");


// film görsellerine ulaşmak için kullanacağımız url
const imageUrl = "https://image.tmdb.org/t/p/w200";

// film kategorilerini alabilmek için kullanacağımız url
const movieList = `${baseUrl}/genre/movie/list?api_key=${apikey}`;

//kategori bilgilerini içinde tutacak objemiz
let genresMap = {};

// kategoriye göre film listelemek için elemanları seçın
const popular = document.querySelector("#popular")
const upcoming = document.querySelector("#upcoming")
const toprated = document.querySelector("#toprated")


const filmKategorileriniListele = () => {
    fetch(movieList)
    .then(response => response.json())
    .then((data)=> {
        // console.log(data);
        data.genres.forEach((genre)=>{
            genresMap[genre.id] = genre.name;
        })
    })
}
filmKategorileriniListele();

// ! İlk olarak en çok oy alan filmleri listeleyelim.
fetch(topratedFilms)
.then(response => response.json())
.then((data)=>{
    console.log(data);
    filmBilgileriniYazdir(data)
   
})






const filmBilgileriniYazdir = (data) => {
    data.results.forEach((veri)=>{
       const posterPath = veri.poster_path
       const genreNames = veri.genre_ids.map((id)=> genresMap[id]).slice(0,2);
       const date = new Date(veri.release_date);
       const formattedDate = date.toLocaleDateString("tr-TR", {
        day : "numeric",
        month : "long",
        year : "numeric",
       })


        // Movie-Card oluşturalım
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.id = veri.id;

        movieCard.addEventListener("click",function(){
            window.location.href = `detay.html?id=${veri.id}`
        })

        // Kart Bilgilerini Ayarlama
        movieCard.innerHTML = `
        <img src="${imageUrl}${posterPath}" alt="">
            <div class="movie-info">
                <h4>${veri.title}</h4>
                <p>${genreNames}</p>
                <p>${formattedDate}</p>
                <h6><span>IMDB</span><i class="fa-solid fa-star"></i>${(veri.vote_average).toFixed(1)} </h6>
            </div>
            
        `;
        moviesWrapper.append(movieCard);  
    })



}
// popular filmleri getirmek için
popular.addEventListener("click",function(){
    filmKategorileriniListele();
    popülerFilmleriYazdir();

})

const popülerFilmleriYazdir = () => {
    fetch(popularFilm)
    .then(response => response.json())
    .then((data)=>{
        moviesWrapper.innerHTML = "";
        filmBilgileriniYazdir(data)
    })
}

// vizyona girecek filmler

upcoming.addEventListener("click",function(){
    filmKategorileriniListele();
    yakindaVizyonaGirecekFilmleriYazdir();

})

const yakindaVizyonaGirecekFilmleriYazdir = () => {
    fetch(upcomingFilms)
    .then(response => response.json())
    .then((data)=>{
        moviesWrapper.innerHTML = "";
        filmBilgileriniYazdir(data)
    })
}

// en çok oy alan filmler

toprated.addEventListener("click",function(){
    filmKategorileriniListele();
    ençokOyalanlarFilmleriYazdir();

})

const  ençokOyalanlarFilmleriYazdir = () => {
    fetch(topratedFilms)
    .then(response => response.json())
    .then((data)=>{
        moviesWrapper.innerHTML = "";
        filmBilgileriniYazdir(data)
    })
}
