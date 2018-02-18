// TODO -
// editText and changeVote functions under 8 lines




$('.save-button').on('click', createCard);
$('.title-input').on('keyup', toggleSaveButton);
$('.body-input').on('keyup', toggleSaveButton);
$('.card-area').on('click', '.delete-button', deleteCard);
$('.card-area').on('click', '.upvote-button', changeVote);
$('.card-area').on('click', '.downvote-button', changeVote);
$('.card-area').on('keyup', '.card-title', editText);
$('.card-area').on('keyup', '.card-body', editText);
$('.search-input').on('keyup', filterCards);

$(function getIdeas() {
  $.each(localStorage, prependStorage);
});   

function prependStorage(index, element) {
  if (index >= localStorage.length) {
  var getIdea = JSON.parse(localStorage.getItem(index));
  $('.card-area').prepend(transformCard(getIdea));
  }
};

function CardFactory(title, body) {
  this.id = $.now();
  this.title = title;
  this.body = body;
  this.voteQuality = 'swill';
};

function transformCard(newCard) {
  return (`
    <article class="card-container" id="${newCard.id}">
      <h2 class="card-title" contenteditable="true">${newCard.title}</h2>
      <button class="button delete-button" aria-label="delete card"></button>
      <p class="card-body" contenteditable="true">${newCard.body}</p>
      <button class="button upvote-button" aria-label="upvote card"></button>
      <button class="button downvote-button" aria-label="downvote card"></button>
      <p class="quality-text" aria-label="quality ${newCard.voteQuality}" tabindex="0" aria-live="assertive" aria-atomic="true">quality: <span class="vote-quality">${newCard.voteQuality}</span></p>
    </article>
  `);
};

function createCard(e) {
  e.preventDefault();
  var newCard = new CardFactory($('.title-input').val(), $('.body-input').val());
  saveCard(newCard);
  prependCard(newCard);
  clearInputs();
  toggleSaveButton();
};

function saveCard(newCard) {
  var stringifyCard = JSON.stringify(newCard);
  localStorage.setItem(newCard.id, stringifyCard);
}

function prependCard(newCard) {
  $('.card-area').prepend(transformCard(newCard));
}

function clearInputs() {
  $('.title-input').val('').focus();
  $('.body-input').val('');
};

function toggleSaveButton() {
  if ($('.title-input').val() && $('.body-input').val()) {
    $('.save-button').prop('disabled', false);
  } else {
    $('.save-button').prop('disabled', true);
  }
};

function deleteCard() {
  localStorage.removeItem($(this).parent()[0].id);
  $(this).parent().remove();
};

function pullCardFromStorage(button) {
  var idFinder = $(button).parent()[0].id;
  var ideaObject = JSON.parse(localStorage.getItem(idFinder));
  return ideaObject;
}

function saveCardToStorage(ideaObject) {
  var idFinder = ideaObject.id;
  localStorage.setItem(idFinder, JSON.stringify(ideaObject));
}

function changeVote() {
  var voteText = $(this).parent().find('.vote-quality');
  var ideaObject = pullCardFromStorage(this);
  var quality = ['swill', 'plausible', 'genius']
  var index = quality.indexOf(voteText.text())
  if ($(this).hasClass('upvote-button')) {
    index++;
    ideaObject.voteQuality = quality[index];
  } else {
    index--;
    ideaObject.voteQuality = quality[index];
  }
  voteText.text(quality[index]);
  saveCardToStorage(ideaObject);
};

function editText(e) {
  var idFinder = $(this).parent()[0].id;
  var ideaStorage = JSON.parse(localStorage.getItem(idFinder));
  if (e.keyCode === 13 || $('.card-area').blur() && $(this).hasClass('card-title')) {
    ideaStorage.title = $(this).text();
    localStorage.setItem(idFinder, JSON.stringify(ideaStorage))
  } else {
    ideaStorage.body = $(this).text();
    localStorage.setItem(idFinder, JSON.stringify(ideaStorage))
  } 
};

function filterCards(e) {
  e.preventDefault();
  var searchValue = $('.search-input').val().toLowerCase();
  $.each($('.card-container'), function(index, element) {
    element.style.display = searchCards(element.children, searchValue);
  });
};

function searchCards(cards, searchVal) {  
  if (cards[0].innerText.toLowerCase().includes(searchVal) 
  || cards[2].innerText.toLowerCase().includes(searchVal)
  || !searchVal) {
    return 'block';
  } else {
    return 'none';    
  };
};