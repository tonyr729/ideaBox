$('.save-button').on('click', prependCard);
$('.title-input').on('keyup', toggleSaveButton);
$('.body-input').on('keyup', toggleSaveButton);
$('.card-area').on('click', '.delete-button', deleteCard);
$('.card-area').on('click', '.upvote-button', upvote);
$('.card-area').on('click', '.downvote-button', downvote);

function createCard() {
  var titleInput = $('.title-input').val();
  var bodyInput = $('.body-input').val();
  return (`
    <article class="card-container">
      <h2 class="card-title">${titleInput}</h2>
      <button class="button delete-button"></button>
      <p class="card-body">${bodyInput}</p>
      <button class="button upvote-button"></button>
      <button class="button downvote-button"></button>
      <p class="quality-text">quality: <span class="vote-quality">swill</span></p>
    </article>
  `);
}

function prependCard(e) {
  e.preventDefault();
  $('.card-area').prepend(createCard());
  clearInputs();
  toggleSaveButton();
};

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
}


