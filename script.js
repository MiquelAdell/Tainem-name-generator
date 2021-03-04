
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generate() {
  var genderId = randomElement([0,1]);
  var genderIcons = ["♂",'♀'];
  var pronouns = ["un","una"];

  $('#nomDePnj').html(word());
  $('#quirk').html(randomElement(quirks));
  $('#nationality').html(randomElement(nationalities)[genderId]);
  $('#pronoun').html(pronouns[genderId]);
  $('#genderIcon').html(genderIcons[genderId]);


  $('.skills__fillable').each(function(){
      var randomI = Math.floor(Math.random() * skills.length);
      var skill = skills[randomI];
      skills.splice(randomI, 1);
      $(this).html(skill);
  });

  var other = "";
  aspects.forEach(async function(aspect) {
      other += "<strong>"+aspect.name+": </strong>";
      other += randomElement(aspect.values)+"<br>";
  });

  $('#other').html(other)

  $('#nomDeLloc').html(word());
}
$( document ).ready(function() {
  generate();

  $('#button').click(function(event){
    event.preventDefault();
    generate();
  });
});
