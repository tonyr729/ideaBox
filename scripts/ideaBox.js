$('.save-button').on('click', createCard);
$('.save-button').on('click', showOnlyTen);
$('.showall-button').on('click', showMoreThanTen);
$('.title-input, .task-input').on('keyup', toggleSaveButton);
$('.filter-input').on('keyup', selectCards);
$('.card-area').on('click', '.delete-button', deleteCard);
$('.card-area').on('click', '.upvote-button, .downvote-button', changeVote);
$('.card-area').on('keyup', '.card-title, .card-task', editText);
$('.card-area').on('click', '.complete-button', completeCard);
$('.showcompleted-button').on('click', gatherComplete);
$('.filter-form').on('click', '.quality-button', displayCards);

$(function getIdeas() {
  $.each(localStorage, prependStorage);
});   

function prependStorage(index, element) {
  var getIdea = JSON.parse(localStorage.getItem(index));
  if (index >= localStorage.length && getIdea.status === 'incomplete') {
    $('.card-area').prepend(transformCard(getIdea));
  } else {
    $('.showcompleted-button').css('display', 'block');
  }
};

function CardFactory(title, task) {
  this.id = $.now();
  this.title = title;
  this.task = task;
  this.voteQuality = 'normal';
  this.status = 'incomplete';
};

function createCard(e) {
  e.preventDefault();
  var newCard = new CardFactory($('.title-input').val(), $('.task-input').val());
  saveCard(newCard);
  prependCard(newCard);
  clearInputs();
  toggleSaveButton();
};

function transformCard(newCard, classname) {
  return (`
    <article class="card-container ${classname}" id="${newCard.id}">
      <h2 class="card-title" contenteditable="true">${newCard.title}</h2>
      <button class="button delete-button" aria-label="delete card"></button>
      <p class="card-task" contenteditable="true">${newCard.task}</p>
      <button class="button upvote-button" aria-label="upvote card"></button>
      <button class="button downvote-button" aria-label="downvote card"></button>
      <p class="quality-text" aria-label="quality ${newCard.voteQuality}" tabindex="0" aria-live="assertive" aria-atomic="true">quality: <span class="vote-quality">${newCard.voteQuality}</span></p>
      <button class="button complete-button" aria-label="complete card">Complete</button>
    </article>
  `);
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
  $('.task-input').val('');
};

function toggleSaveButton() {
  if ($('.title-input').val() && $('.task-input').val()) {
    $('.save-button').prop('disabled', false);
  } else {
    $('.save-button').prop('disabled', true);
  }
};

function showOnlyTen() {
  var card = $('.card-container')
  if (card.length > 10) {
    $(card[10]).hide()
    $('.showall-button').css("display", "block");
  }
}

function showMoreThanTen() {
  var card = $('.card-container')
  $(card).show()
}

function gatherComplete(event) {
  event.preventDefault();
  $.each(localStorage, prependComplete);
}

function prependComplete(index, element) {
  var getIdea = JSON.parse(localStorage.getItem(index));
  if (index >= localStorage.length && getIdea.status === 'complete') {
    $('.card-area').prepend(transformCard(getIdea, 'transparent'));
  } 
}

function deleteCard() {
  localStorage.removeItem($(this).parent()[0].id);
  $(this).parent().remove();
};

function completeCard() {
  var ideaObject = pullCardFromStorage(this);
  $(this).parent().toggleClass('transparent');
  ideaObject.status = ideaObject.status === 'incomplete' ? 'complete' :  'incomplete';
  $('.showcompleted-button').prop('disabled', false);
  saveCardToStorage(ideaObject);
};

function pullCardFromStorage(element) {
  var idFinder = $(element).parent()[0].id;
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
  var quality = ['none', 'low', 'normal', 'high', 'critical'];
  var index = quality.indexOf(voteText.text());
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
  var ideaObject = pullCardFromStorage(this);
  if (e.keyCode === 13 || $('.card-area').blur() && $(this).hasClass('card-title')) {
    ideaObject.title = $(this).text();
    saveCardToStorage(ideaObject);
  } else {
    ideaObject.task = $(this).text();
    saveCardToStorage(ideaObject);
  } 
};

function selectCards(e) {
  e.preventDefault();
  $.each($('.card-container'), changeCardDisplay)
};

function removeCards() {
  $('.card-container').each(function() {
    this.remove();
  })
}

function displayCards(event) {
  event.preventDefault();
  var buttonText = $(event.target).text().toLowerCase();
  cardsByImportance(buttonText);
}

function cardsByImportance(buttonText) {
  removeCards();
  for (var i = 0; i < localStorage.length; i++) {
    var parsedCard = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if(parsedCard.voteQuality === buttonText) {
      prependCard(parsedCard);
    }
  }
}

function changeCardDisplay(index, element) {
  var filterValue = $('.filter-input').val().toLowerCase();
  element.style.display = filterTask(element.children, filterValue);
};

function filterTask(cards, filterVal) {  
  if (cards[0].innerText.toLowerCase().includes(filterVal) 
  || cards[2].innerText.toLowerCase().includes(filterVal)
  || !filterVal) {
    return 'block';
  } else {
    return 'none';
  };
};
