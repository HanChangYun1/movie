import { genreList } from "./api-data.js";
import { controller, displayMovies, searchByGenres, searchByKeyword } from "./api-functions.js";
import { qySel, qySelAll, setSlide } from "./functions.js";
//////////////////////////////////////////////
setSlide([])
//////////////////////////////////////////////
let timeoutId
let page
let totalPages
let isPending = true 
let genreNumbers = []
//////////////////////////////////////////////
const setDatalist = () => {
  if (!localStorage.getItem('keywordsStorage')) return false
  let keywords = JSON.parse(localStorage.getItem('keywordsStorage'))
  keywords.forEach(keyword => {
    qySel('#keyword-list').insertAdjacentHTML('beforeend', `
      <option>${keyword}</option>
    `)
  })
}//setDatalist
setDatalist()
//////////////////////////////////////////////
qySel('.search-form').addEventListener('submit', e => {
  e.preventDefault()
})//
//////////////////////////////////////////////
qySel('.search-input').addEventListener('input', async e => {
  clearTimeout(timeoutId)
  page = 1
  isPending = true
  genreNumbers = []
  qySelAll('.genre-btn').forEach(button => {
    button.classList.remove('active')
  })//genre-btn forEach

  qySel('.grid-container').innerHTML = ''
  if(e.target.value === '') return false
  
  timeoutId = setTimeout(async () => {
    controller.abort()    
    let movieData = await searchByKeyword(e.target.value)
    let movies = movieData.results
    displayMovies(movies, '.grid-container')

    let keywords = localStorage.getItem('keywordsStorage')
      ? JSON.parse(localStorage.getItem('keywordsStorage'))
      : []

    if (movies.length === 0 || keywords.includes(e.target.value)) return
    keywords.unshift(e.target.value)
    keywords = keywords.slice(0, 10)
    localStorage.setItem('keywordsStorage', JSON.stringify(keywords))
    qySel('#keyword-list').innerHTML = ''
    keywords.forEach(keyword => {
      qySel('#keyword-list').insertAdjacentHTML('beforeend', `
        <option>${keyword}</option>
      `)
    })//forEach
  }, 500)
})//input

qySel('.delete-btn').addEventListener('click', e => {
  if (!confirm('검색 기록을 삭제하시겠습니까')) return
  localStorage.removeItem('keywordsStorage')
  qySel('#keyword-list').innerHTML = ''
})//click
//////////////////////////////////////////////

const setGenreBtns = () => {
  for (let genreNumber in genreList) {
    qySel('.genre-btns').insertAdjacentHTML('beforeend', `
      <button class="genre-btn" value="${genreNumber}">
        ${genreList[genreNumber]}
      </button>
    `)//insertAdjacentHTML
  }//for in
}//setGenreBtns

const genreBtnsHandler = () => {
  qySelAll('.genre-btn').forEach(button => {
    button.addEventListener('click', async e => {
      clearTimeout(timeoutId)

      page = 1
      isPending = true
      qySel('.search-input').value = ''
      qySel('.grid-container').innerHTML = ''
      e.target.classList.toggle('active')
      
      let idx = genreNumbers.indexOf(e.target.value)
      if (idx === -1) genreNumbers.push(e.target.value)
      else genreNumbers.splice(idx, 1)
      if(genreNumbers.length===0) return false

      timeoutId = setTimeout(async () => {
        controller.abort()
        let movieData = await searchByGenres(genreNumbers.join(','), 1)
        totalPages = movieData.total_pages
        let movies = movieData.results
        displayMovies(movies, '.search-result-section .grid-container')
        isPending = false
      }, 500)
    })//click
  })//forEach
}//genreBtnsHandler

setGenreBtns()
genreBtnsHandler()
//////////////////////////////////////////
const observer = new IntersectionObserver(async ([entry]) => {
  if(entry.intersectionRatio > .1 && isPending === false){
    isPending = true
    page ++
    if(page > totalPages || page > 10) return false
    let movieData = await searchByGenres(genreNumbers, page)
    let movies = movieData.results
    displayMovies(movies, '.grid-container')
    isPending = false
  }//if
})//IntersectionObserver

observer.observe(qySel('.trigger'))