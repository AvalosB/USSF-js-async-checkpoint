const fetch = require('node-fetch');
const fs = require('fs');

var pokemonList = [];
const inputFile = process.argv[2];

const doTheThing = (err, data) => {
    if (err) throw err;
    pokemonList = data.toString().split("\n");

    for(let pokemon of pokemonList){
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`).then(
            response => response.json()
        ).then(
            data => console.log((data.forms[0].name),  ' is a ' , getTypesAsString(data) + ' type')
        ).catch(
            function(errorMsg){
                console.log(`${pokemon} not found.`);
            }
        );
    }
}


fs.readFile(inputFile, doTheThing);


function getTypesAsString(data){
    let typesArray = data.types.map(function(value){
        return value.type.name;
    });

    let typesString = typesArray.join(", ");
    return typesString;
}


