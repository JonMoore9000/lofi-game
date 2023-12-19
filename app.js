/* -------------------------------------------------
document ready
------------------------------------------------- */
$(document).ready(function() {
    $('button').on('click', () => {
        if(credits > 1) {
            shuffle(letters)
            genAttr()
            rarityLogic()
            let title = letters.slice(0,nameLength(3,10))
            let newName = title.join('').toString()
            const newCreature = new Creature(newName, weight, height, tier)
            console.log(newCreature)
            credits -= 1
            $('#credits').text(credits)
            creaturesArr.push(newCreature)
            //console.log(creaturesArr)
            displayCreatures()
        }
        else {
            alert('you need more credits')
        }
    })
});

/* -------------------------------------------------
earning credits every second
------------------------------------------------- */
let credits = 0

const startCredits = () => {
    setInterval(() => {
        credits++
        //console.log(credits)
        $('#credits').text(credits)
    }, 1000)
}

startCredits()

/* -------------------------------------------------
generating random creatures
------------------------------------------------- */

let letters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97)); 
let creaturesArr = []
let tier
let weight
let height
let random

class Creature {
    constructor(title, weight, height, rarity) {
        this.title = title
        this.weight = weight
        this.height = height
        this.rarity = rarity
    }
}

//display creature
const displayCreatures = () => {
    let arr = ''
    arr = creaturesArr.map((item) => {
        return `<div class="creature-block">`
        + `<p>Name: <span  class="mon-name">${item.title}</span></p>`
        + `<p>Weight: ${item.weight} lbs</p>`
        + `<p>Height: ${item.height} ft</p>`
        + `<p>Rarity: ${item.rarity}</p>`
        + `</div>`
    })
    //console.log(arr)
    $('#creatures').html(arr)
}

// shuffle array function
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

// function to generate name length
function nameLength(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// generate creature attributes
const genAttr = () => {
    weight = Math.floor(Math.random() * 10000) // pounds
    height = Math.floor(Math.random() * 1000)  // feet
    rarity = Math.floor(Math.random() * 1000)  // common, uncommon, rare, epic, mythic
    console.log(rarity)
}

// rng rarity generator
const rarityLogic = () => {
	if (rarity == 0) {
  	tier = 'Mythic'
  }
  if ((rarity > 1) && (rarity < 50)) {
  	tier = 'Epic'
  }
  if ((rarity >= 50) && (rarity < 200)) {
  	tier = 'Rare'
  }
  if ((rarity >= 200) && (rarity < 450)) {
  	tier = 'Uncommon'
  }
  if ((rarity >= 450) && (rarity <= 1000)) {
  	tier = 'Common'
  }
}

