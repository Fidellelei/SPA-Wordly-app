const form = document.getElementById("searchForm");
const input = document.getElementById("wordInput");
const result = document.getElementById("result");


//submit search form
form.addEventListener("submit", function(e){

    e.preventDefault();

    const word = input.value.trim();

    // Empty input check
    if(word === ""){
        result.innerHTML = "<p class='error'>Please enter a word.</p>";
        return;
    }

    searchWord(word);

});


// API data fetching
function searchWord(word){

fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

.then(response => response.json())

.then(data => {

    if(data.title === "No Definitions Found"){
        result.innerHTML = "<p class='error'>Word not found.</p>";
        return;
    }

    displayWord(data[0]);

})

.catch(error => {
    result.innerHTML = "<p class='error'>API request failed.</p>";
});

}


// Display results
function displayWord(data){

const meaning = data.meanings[0];

const definition = meaning.definitions[0].definition;

const example = meaning.definitions[0].example || "No example available";

const synonyms = meaning.synonyms.length > 0
? meaning.synonyms.join(", ")
: "No synonyms";

const audio = data.phonetics.find(item => item.audio)?.audio || "";

result.innerHTML = `

<div class="result-box">
=
<h2>${data.word}</h2>

<p><strong>Pronunciation:</strong> ${data.phonetic || "N/A"}</p>

<p><strong>Definition:</strong> ${definition}</p>

<p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>

<p><strong>Example:</strong> ${example}</p>

<p><strong>Synonyms:</strong> ${synonyms}</p>

${audio ? `<audio controls src="${audio}"></audio>` : "<p>No audio available</p>"}

</div>

`;

}