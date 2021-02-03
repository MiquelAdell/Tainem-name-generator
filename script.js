/***********************
 **** CONFIGURATION ****
 ***********************/

/*
 * CHARACTER SETS
 */
const vowels = [
  "a", "e", "i", "o", "u", "oe", "ao", "eo", "ai"
]

const consonantsBeforeVowel = [
  "b", "c", "d", "f", "g", "h", "j", "l", "m", "n", "p", "r", "s", "t", "v", "z"
];

const consonantsAfterVowel = [
  "b", "d", "f", "l", "m", "n", "r", "s", "t", "z"
];

const consonantsBetweenVowels = [
  "b", "d", "f", "g", "h", "j", "l", "m", "n", "p", "r", "s", "t", "v", "x", "z",
  "dn", "bd", "pt",
];

const distributionOfnumberOfSyllables = [
  1,
  2,2,2,2,
  3,3,3,3,3,3,3,3,
  4,4,4,4,4,
  5,5,
  6,
];

/*
 * PROBABILITIES
 */
const START_WITH_CONSONANT = 0.5;
const VOWEL_BREAK = 1;
const CONSONANT_BREAK = 1;
const SPACE = 0.05;
const HYPEN = 0.05;

/***********************
 ******** CODE *********
 ***********************/

var lastSyllabe = null;
var lastLetter = null;
var allConsonants = consonantsBeforeVowel.concat(consonantsAfterVowel, consonantsBetweenVowels);

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getVowel(){
  while (true) {
    vowel = randomElement(vowels);
    if ( vowel != lastLetter ){
      return vowel;
    }
  }
}

function getVowelConsonant() {
  return randomElement(vowels)+randomElement(consonantsAfterVowel);
}

function getConsonantVowel() {
  return randomElement(consonantsBeforeVowel)+randomElement(vowels);
}

function getConsonantsBetweenVowels() {
  return randomElement(consonantsBetweenVowels);
}

function getVowelBetweenConsonants() {
  return randomElement(vowels);
}

function getPreviousLetter( ) {
  return lastLetter;
}

function isPreviousLetterAVowel(i, word) {
  return vowels.includes(getPreviousLetter());
}

function isPreviousLetterAConsonant() {
  return allConsonants.includes(getPreviousLetter());
}

function isPreviousLetterAHypen() {
  return getPreviousLetter() == "-";
}

function isPreviousLetterASpace() {
  return getPreviousLetter() == " ";
}

function getSyllabe(i, word) {
  if ( i === 0 ) {
    if ( Math.random() <= START_WITH_CONSONANT ) {
      return getConsonantVowel();
    } else {
      return getVowelConsonant();
    }
  } else {
    if (
      (i+1) < word.length && //don't put spaces or hypens on the last sylabe
      !isPreviousLetterAHypen() && //don't put a space after an hypen
      !isPreviousLetterASpace() //or a hypen after a space
    ) { //not the last syllabe
      if ( Math.random() <= HYPEN ) { //provability of a hypen
         return "-";
      }
      if ( Math.random() <= SPACE ) { //provability of a space
         return " ";
      }
    }

    if ( isPreviousLetterAHypen() || isPreviousLetterASpace() ) {
      //a hypen breaks the vowel consonant sequence so we have the same
      //provability of starting with vowel+consonant or consonant+vowel as when starting
      if ( Math.random() <= START_WITH_CONSONANT ) {
        return getConsonantVowel();
      } else {
        return getVowelConsonant();
      }
    }

    if ( isPreviousLetterAVowel() ) {
      //Provability of a consonant that breaks
      //the consonant+vowel followed by consonant+vowel
      if ( Math.random() <= CONSONANT_BREAK ) {
        return getConsonantsBetweenVowels();
      } else {
        return getConsonantVowel();
      }
    }
  }

  if ( isPreviousLetterAConsonant() ) {
    //Provability of a single vowel that breaks
    //the vowel+consonant followed by vowel+consonant
    if ( Math.random() <= VOWEL_BREAK ) {
      return getVowelBetweenConsonants();
    } else {
      return getVowelConsonant();
    }
  }
  throw 'What was previous letter? Shouldn\'t be here lastSyllabe: '+lastSyllabe+' lastLetter: '+lastLetter;
}

function word(){
  var word = "";
  var totalNumberOfSyllables = randomElement(distributionOfnumberOfSyllables);

  word = new Array(totalNumberOfSyllables);
  for (var i = 0; i < word.length; i++){
    var syllabe = getSyllabe(i, word);
    lastSyllabe = syllabe;
    lastLetter = syllabe.charAt(syllabe.length-1);
    word[i] = syllabe;
  }
  word = word.join("");
  word = word.charAt(0).toUpperCase() + word.slice(1);
  return word;
}

function generate() {
  var text = "";
  var paraulesAGenerar = 10;
  for (var p = 0; p < paraulesAGenerar; p++) {
    text = text+"<br>"+word();
  }

  $('#text').html(text);
}
$( document ).ready(function() {
  generate();

  $('#button').click(function(event){
    event.preventDefault();
    generate();
  });
});
