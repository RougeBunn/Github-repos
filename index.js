'use strict';

const searchURL = 'https://api.github.com/users/:username/repos';


function formatQueryParams(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let u = 0; u < responseJson.length; u++){
    $('#results-list').append(`<li><h3><a href="${responseJson[u].owner.url}">${responseJson[u].name}</a></li>`);
  }
  $('#results').removeClass('hidden');
}

function getRepos() {
  const url = searchURL.replace(':username', $('#js-search-term').val());
  console.log(url);


  fetch(url)
    .then(response => response.json())
    .then(responseJson => formatQueryParams(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getRepos();
  });
}

$(watchForm);