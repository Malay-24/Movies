async function searchMovie() {
    // get movie name
    try{
        let movie = document.getElementById('query').value;
        let res = await fetch(`http://www.omdbapi.com/?apikey=1e67efd2&s=${movie}`)

        let data = await res.json();
        return data.Search;

    } catch(err) {
        console.log('err:', err)

    }
}


async function main(){


    let data = await searchMovie();
        if(data === undefined){
            return false;
        }
        
    console.log('data:', data);

    appendData(data)

}

let movies_div = document.getElementById("movies")

function appendData(movies) {
    movies_div.style.display="grid";

    movies_div.innerText="";
    

    movies.forEach(function (el) {
        let divP= document.createElement("div");
        let p = document.createElement("h3");
        p.innerText = el.Title ;
        p.onclick= (i) =>{
        // console.log('el:', el);
        movies_div.style.display="none";

        AppendToUI(el);
        }
        let year = document.createElement("p");
        year.textContent=`Year: ${el.Year}`
        divP.append(p,year)

        let divI = document.createElement("div")
        let img =document.createElement("img")
        img.src=el.Poster;
        divI.append(img)

        movies_div.append(divI,divP);
    })
}

/*
{Title: 'The Avengers', 
Year: '2012', 
imdbID: 'tt0848228', 
Type: 'movie', 
Poster: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMj…GI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'}
*/

let UI = document.getElementById("ui")

let AppendToUI= async (el) =>{

    UI.innerHTML="";

    let imgdiv = document.createElement("div");
    imgdiv.setAttribute("id","imgdiv")

    let img = document.createElement("img");
    img.src = el.Poster;

    imgdiv.append(img);

    let infodiv = document.createElement("div");
    infodiv.setAttribute("id","infodiv");

    let title=document.createElement("h2")
    title.innerText=`Movie: ${el.Title}`

    let year=document.createElement("p")
    year.innerText=`Relesed Year: ${el.Year}`

    let type=document.createElement("p")
    type.innerText=`Type: ${el.Type}`;

    let rate = el.imdbID;
    
    let response = await fetch(`http://www.omdbapi.com/?apikey=1e67efd2&i=${rate}`);
    let dataI = await response.json();

    let cast = document.createElement("p")
    cast.innerText=`Movie Plot: ${dataI.Actors}`

    let info=document.createElement("p")
    info.innerText=`Movie Plot: 
    ${dataI.Plot}`

    let Ratings=document.createElement("p")
    Ratings.innerText=`IMDB: ★ ${dataI.Ratings[0].Value}`

    infodiv.append(title,year,type,cast,info,Ratings);

    UI.append(imgdiv,infodiv);
    
}

let timerId;

function debounce(func, delay) {

    

    if(timerId) {
        clearTimeout(timerId)
    }
    

    timerId= setTimeout(function() {
        func();
    }, delay);

}