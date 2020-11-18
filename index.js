const fetch = require('node-fetch');
const fs = require('fs');

var pokemonList = [];

const doTheThing = (err, data) => {
    if (err) throw err;
    pokemonList = data.toString().split("\n");

    for(let pokemon of pokemonList){
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(
            response => response.json()
        ).then(
            data => console.log((data.forms[0].name),  ' is a ' , getTypesAsString(data) + ' type')
        );
    }
}

fs.readFile('input.txt', doTheThing);


//node index.js input.txt
//node index.js myPokemon.txt
//node index.js ionsPokemons.txt



function getTypesAsString(data){
    let typesArray = data.types.map(function(value){
        return value.type.name;
    });

    let typesString = typesArray.join(", ");
    return typesString;
}


