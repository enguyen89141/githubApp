'use strict'

let searchURL = 'https://api.github.com/users/'

/*function getUserRepos(newSearchURL) {
    fetch(newSearchURL)
    .then(response => response.json())
    .then(responseJson =>
        displayResults(responseJson))
    .catch(error => 
        $('.error').text('Something went wrong. Please try again later'))
}*/

function getUserRepos(newSearchURL) {
    fetch(newSearchURL)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson =>
        displayResults(responseJson))
    .catch(error => 
        $('.error').text(`Something went wrong: ${error.message}`))
}

function displayResults(responseJson){
    let userName = $('.search').val()
    for (let i = 0; i < responseJson.length; i ++){
        let repoName = 'https://' +userName + '.github.io/' + responseJson[i].name
        $('.results').append('<li>' + responseJson[i].name + '</li><li><a href="' + repoName + '" target="_blank">Link</a></li>')
        $('.results').removeClass('hidden')
    }
}

function getURL() {
    var userName = $('.search').val()
    var newSearchURL = searchURL + userName + '/repos'
    getUserRepos(newSearchURL)
    newSearchURL = ''
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        $('.results').empty ();
        getURL();
        $('.search').val('');
    })
}
watchForm()