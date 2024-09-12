const API_URL = 'https://api.themoviedb.org/3/discover/movie'
const IMAGE_PATH = 'https://api.themoviedb.org/3/collection/{collection_id}/images'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

//Get initial movies

getMoviews(API_URL);