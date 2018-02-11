window.onload = getIdeas();
$('.save-button').on('click', prependCard);
$('.title-input').on('keyup', toggleSaveButton);
$('.body-input').on('keyup', toggleSaveButton);
$('.card-area').on('click', '.delete-button', deleteCard);
$('.card-area').on('click', '.upvote-button', upvote);
$('.card-area').on('click', '.downvote-button', downvote);

function createCard(newCard) {
  return (`
    <article class="card-container" id="${newCard.id}">
      <h2 class="card-title">${newCard.title}</h2>
      <button class="button delete-button"></button>
      <p class="card-body">${newCard.body}</p>
      <button class="button upvote-button"></button>
      <button class="button downvote-button"></button>
      <p class="quality-text">quality: <span class="vote-quality">swill</span></p>
    </article>
  `);
}


function ObjectFactory(title, body) {
  this.id = $.now();
  this.title = title;
  this.body = body;
}

function prependCard(e) {
  e.preventDefault();
  var titleInput = $('.title-input').val();
  var bodyInput = $('.body-input').val();
  var newCard = new ObjectFactory(titleInput, bodyInput);
  var uniqueId = newCard.id;
  console.log(uniqueId);
  var stringifyCard = JSON.stringify(newCard);
  localStorage.setItem(uniqueId, stringifyCard);
  $('.card-area').prepend(createCard(newCard));
  clearInputs();
  toggleSaveButton();
};

function getIdeas() {
 for(var i = 0; i < localStorage.length; i++) {
  var getIdea = localStorage.getItem(localStorage.key(i));
  var parseIdea = JSON.parse(getIdea);
  $('.card-area').prepend(createCard(parseIdea));
  clearInputs();
  toggleSaveButton();
 }
}

function clearInputs() {
  $('.title-input').val('').focus();
  $('.body-input').val('');
}

function toggleSaveButton() {
  if ($('.title-input').val() && $('.body-input').val()) {
    $('.save-button').prop('disabled', false);
  } else {
    $('.save-button').prop('disabled', true);
  }
}

function deleteCard() {
  $(this).parent().remove();
}

function upvote() {
  var voteQuality = $(this).next().next().children();
   if (voteQuality.text() === 'swill') {
      voteQuality.text('plausible'); 
    } else if (voteQuality.text() === 'plausible') {
      voteQuality.text('genius');
    };
}

function downvote() {
  var voteQuality = $(this).next().children();
  if (voteQuality.text() === 'genius') {
      voteQuality.text('plausible'); 
    } else if (voteQuality.text() === 'plausible') {
      voteQuality.text('swill');
    };
};



