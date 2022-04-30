const numResults = 3;

function onJson2(json) {
  console.log('JSON ricevuto');
  console.log(json);
  // Svuotiamo la libreria
  const library = document.querySelector('#library-view2');
  library.innerHTML = '';

  if (json.status == 400) {
	const errore = document.createElement("h1"); 
	const messaggio = document.createTextNode(json.detail); 
	errore.appendChild(messaggio); 
	library.appendChild(errore);
	return
  }
  
  const results = json.albums.items;
  
  if(results.length == 0)
  {
	const errore = document.createElement("h1"); 
	const messaggio = document.createTextNode("Nessun risultato!"); 
	errore.appendChild(messaggio); 
	library.appendChild(errore);
  }

  for(let i=0; i<numResults; i++)
  {
    // Leggi il documento
    const album_data = results[i]
    // Leggiamo info
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
    // Creiamo il div che conterrà immagine e didascalia
    const album = document.createElement('div');
    album.classList.add('book');
    // Creiamo l'immagine
    const img = document.createElement('img');
    img.src = selected_image;
    // Creiamo la didascalia
    const caption = document.createElement('span');
    caption.textContent = title;
    // Aggiungiamo immagine e didascalia al div
    album.appendChild(img);
    album.appendChild(caption);
    // Aggiungiamo il div alla libreria
    library.appendChild(album);
  }

  
}





function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}



function search2(event)
{
	// Impedisci il submit del form
	event.preventDefault();
  
	// Leggi valore del campo di testo
	const content = document.querySelector('#libro2').value;
  
	// verifico che sia stato effettivamente inserito del testo
	if(content) 
	{
	    const text = encodeURIComponent(content);
		console.log('Eseguo ricerca elementi riguardanti: ' + text);
  		
			 // Esegui la richiesta
 	 fetch("https://api.spotify.com/v1/search?type=album&q=" + text,
 		{
			headers:
			{
	 			 'Authorization': 'Bearer ' + token_data
			}
  		}).then(onResponse).then(onJson2);
	}
	
		
}




function onInsert(response) {
	console.log('risposta ricevuta');
	return response.text();
}

 

//Key and secret for SPOTIFY OAuth2.0 
const client_id = 'c12b12a7e1d740148eae003599d00783';
const client_secret = '1a1a849b83f74d8c9045aa31268a2fe8';
const endpoint_token = 'https://accounts.spotify.com/api/token' 


function getToken(json)
{
	token_data = json.access_token;
	console.log(json);
}

function onTokenResponse(response) {
    console.log(response);
  return response.json();
}

// All'apertura della pagina, richiediamo il token
let token_data;


fetch(endpoint_token,
{
	method: "post",
	body: 'grant_type=client_credentials',
	headers:
	{
		'Content-Type':'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
	}
	
}
).then(onTokenResponse).then(getToken);




// Aggiungo event listener al form1 per la RICERCA
const form2 = document.querySelector('#search_content');
form2.addEventListener('submit', search2)


  
  



