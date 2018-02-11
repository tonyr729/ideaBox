
$('.save-button').on('click', prependCard);

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
}