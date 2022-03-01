// CREATING VARIABLES

const form= document.getElementById("form");
const search= document.getElementById("search");
const result= document.getElementById("result");

const apiURL="https://api.lyrics.ovh";

// GETTING INPUT

form.addEventListener("submit",e=>{
    e.preventDefault();
    let term = search.value.trim();
    beginSearch(term);
})

//SEARCH FUNCTION

async function beginSearch(term){
    const searchResult = await fetch(`${apiURL}/suggest/${term}`);
    const data = await searchResult.json();
    //console.log(data);
    displayData(data);
}

//DISPLAY RESULT

function displayData(data){
    result.innerHTML=`
    <ul class="songs">
    ${data.data.map(song=>`
        <li>
            <div>
                <strong>${song.artist.name}</strong>-${song.title}
            </div>
            <span data-artist="${song.artist.name}" data-songtitle="${song.title}">
                Get Lyrics
            </span>
        </li>
    `)
    .join('')}
    </ul>`;
}

//GET LYRICS BUTTON RESPONSE

result.addEventListener("click", e=>{
    const clickedElement = e.target;

    if(clickedElement.tagName === 'SPAN'){
        const artist= clickedElement.getAttribute('data-artist');
        const songTitle= clickedElement.getAttribute('data-songtitle');
        getLyrics(artist, songTitle);
    }
})

//GETTING LYRICS
async function getLyrics(artist, songTitle){
    const response= await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data= await response.json();
    if(data.lyrics){
        const lyrics= data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        result.innerHTML=`<h2><u><strong>${artist}</strong>-${songTitle}</u></h2>
        <p style="font-size:1.4rem; font-family: cursive;">${lyrics}</p>`;  
    } else{
        alert("Sorry Lyrics not found. Please try another link");
    }
     
}    


// Nazir Hussain //