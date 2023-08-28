import { baseUrl, apiKey, ko, en, options, imgPaths, gradeColors } from "./api-data.js";
import { qySel } from "./functions.js";

export const getMovies = (option, lang = ko) => {
  return new Promise(async resolve => {
    let result = await fetch(`${baseUrl}${option}${apiKey}${lang}`)
    let data = await result.json()
    resolve(data)
  })//promise  
}//getMovies

export const getMovie = (movieId, lang = ko) => {
  return new Promise(async resolve => {
    let result = await fetch(`${baseUrl}/movie/${movieId}${apiKey}${lang}`)
    console.log(result);
    let data = await result.json()
    resolve(data)
  })//promise
}//getMovie

export const getVideos = (movieId, lang = ko) => {
  return new Promise(async resolve => {
    let result = await fetch(`${baseUrl}/movie/${movieId}/videos${apiKey}${lang}`)
    let data = await result.json()
    resolve(data)
  })//promise
}//getVideos

export const displayMovies = (data, container, gridClassName = '') => {
  if (data.length === 0) {
    qySel(container).innerHTML = '<p class="no-data">관련 영화목록이 존재하지 않습니다</p>'
    return false
  }//if 

  return new Promise(resolve => {
    data.forEach(movie => {
      let { id, poster_path, vote_average, title, genre_ids, release_date } = movie
      let imgPath = (poster_path) ? `${imgPaths.w500}${poster_path}` : './img/no-image.jpg'
      vote_average = vote_average.toFixed(1)
      let gradeLevel = Math.floor(vote_average - 5)
      if(gradeLevel > 4) gradeLevel = 4
      if(gradeLevel < 0) gradeLevel = 0
      let gradeColor = gradeColors[gradeLevel]

      qySel(container).insertAdjacentHTML('beforeend', `
        <figure class="${gridClassName}">
          <a href="./detail.php?id=${id}">
            <div class="imgbox">
              <img src="${imgPath}" alt="">
              <span style="background:${gradeColor}"></span>
              <small>${vote_average}</small>
            </div><!-- imgbox -->
            <figcaption>
              <h3>{영화제목}</h3>
              <p>{액션 / 코메디 / 애니메이션}</p>
              <p>{2023-8-6}</p>
            </figcaption>
          </a>
        </figure>
      `)//insertAdjacentHTML
    })//forEach
    resolve()
  })//promise
}//displayMovies

