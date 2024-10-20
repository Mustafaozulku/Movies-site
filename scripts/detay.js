const apikey = "def95e063c28b4c1f0b98de2c46f88a8";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w400";

// url den film id sini almak
const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get("id"); 

// film detayları Api url için
const filmDetailsUrl = `${baseUrl}/movie/${filmId}?api_key=${apikey}`

// Oyuncular ile ilgili Api URL için;
const filmCreditsUrl = `${baseUrl}/movie/${filmId}/credits?api_key=${apikey}`;

// film detaylarını gösterecek kapsayıcı eleman
const filmWrapper = document.querySelector(".film-detay-wrapper")

// film detaylarını göstermek için
const  filmBilgileriniGöster = (data)=>{
    const posterPath = data.poster_path ? `${imageUrl}${data.poster_path}`:`https://www.reelviews.net/resources/img/default_poster.jpg`

    const genreNames = data.genres.map((genre) => genre.name);
    // console.log(genreNames);
    
    const releaseDate = new Date(data.release_date).toLocaleDateString("tr-TR",{
        year : "numeric",
        month : "long",
        day : "numeric",
    })

   filmWrapper.innerHTML = `
   
   <div class="film-detay">
        <img src="${posterPath}" alt="">
        <div class="film-bilgileri">
            <h2>${data.title}</h2>
            <p><strong>Kategoriler:</strong>${genreNames}</p>
            <p><strong>çıkış tarini:</strong>${releaseDate}</p>
            <p><strong>IMDB:</strong>${(data.vote_average).toFixed(1)}</p>
            <p><strong>özet:</strong>${data.overview}</p>


        </div>
    </div>

   `
    

}

const oyuncuBilgileriniGöster = (cast) => {
    console.log(cast);
    
    const oyuncularWrapper = document.querySelector(".oyuncular-wrapper")

    cast.slice(0,8).forEach((oyuncu)=>{
        const oyuncuImageUrl = oyuncu.profile_path ? `${imageUrl}${oyuncu.profile_path}` : `https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=`


        // oyuncu kartı oluştur
        const oyuncuCard = document.createElement("div");
        oyuncuCard.classList.add("oyuncu-card");

        oyuncuCard.innerHTML = `
         <img src="${oyuncuImageUrl}" alt="">
            <h4>${oyuncu.original_name}</h4>
            <p><strong>Karakter:</strong>${oyuncu.character}</p>
        
        `
        oyuncularWrapper.append(oyuncuCard);

    })
}

// film Detayları İçin
fetch(filmDetailsUrl)
.then(response => response.json())
.then((data)=>{
    // console.log(data);
   filmBilgileriniGöster(data);
    
})

// Oyuncu bilgisi için
fetch(filmCreditsUrl)
.then(response => response.json())
.then((data)=>{
    oyuncuBilgileriniGöster(data.cast)
    
})