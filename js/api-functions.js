import {
  baseUrl,
  apiKey,
  ko,
  en,
  options,
  imgPaths,
  gradeColors,
  genreList,
} from "./api-data.js";
import { qySel, qySelAll, videoResize } from "./functions.js";

export const getMovies = (option, lang = ko) => {
  return new Promise(async (resolve) => {
    let result = await fetch(`${baseUrl}${option}${apiKey}${lang}`);
    let data = await result.json();
    resolve(data);
  }); //promise
}; //getMovies

export const getMovie = (movieId, lang = ko) => {
  return new Promise(async (resolve) => {
    let result = await fetch(`${baseUrl}/movie/${movieId}${apiKey}${lang}`);
    let data = await result.json();
    resolve(data);
  }); //promise
}; //getMovie

export const getVideos = (movieId, lang = ko) => {
  return new Promise(async (resolve) => {
    let result = await fetch(
      `${baseUrl}/movie/${movieId}/videos${apiKey}${lang}`
    );
    let data = await result.json();
    resolve(data);
  }); //promise
}; //getVideos

export const getImages = (movieId) => {
  return new Promise(async (resolve) => {
    let result = await fetch(`${baseUrl}/movie/${movieId}/images${apiKey}`);
    let data = await result.json();
    resolve(data);
  }); //promise
}; //getImages

export const getSimilarMovies = (movieId, lang = ko) => {
  return new Promise(async (resolve) => {
    let result = await fetch(
      `${baseUrl}/movie/${movieId}/similar${apiKey}${lang}`
    );
    let data = await result.json();
    resolve(data);
  });
}; //getSimilarMovies

export const getCredits = (movieId, lang = ko) => {
  return new Promise(async (resolve) => {
    const result = await fetch(
      `${baseUrl}/movie/${movieId}/credits${apiKey}${lang}`
    );
    const data = result.json();
    resolve(data);
  }); //Promise
}; //getCredits

export const displayMovies = (data, container, gridClassName = "") => {
  if (data.length === 0) {
    qySel(container).innerHTML =
      '<p class="no-data">관련 영화목록이 존재하지 않습니다</p>';
    return false;
  } //if

  data.forEach((movie) => {
    let { id, poster_path, vote_average, title, genre_ids, release_date } =
      movie;
    let imgPath = poster_path
      ? `${imgPaths.w500}${poster_path}`
      : "./img/no-image.jpg";
    vote_average = vote_average.toFixed(1);
    let gradeLevel = Math.floor(vote_average - 5);
    if (gradeLevel > 4) gradeLevel = 4;
    if (gradeLevel < 0) gradeLevel = 0;
    let gradeColor = gradeColors[gradeLevel];
    let genres = genre_ids.map((num) => genreList[num]).join(" / ");
    qySel(container).insertAdjacentHTML(
      "beforeend",
      `
        <figure class="${gridClassName}">
          <a href="./detail.php?id=${id}">
            <div class="imgbox">
              <img src="${imgPath}" alt="">
              <span style="background:${gradeColor}"></span>
              <small>${vote_average}</small>
            </div><!-- imgbox -->
            <figcaption>
              <h3>${title}</h3>
              <p>${genres}</p>
              <p>${release_date}</p>
            </figcaption>
          </a>
        </figure>
      `
    ); //insertAdjacentHTML
  }); //forEach
}; //displayMovies

export const displayVideos = (data, container) => {
  if (!data.length) {
    qySel(container).innerHTML =
      '<p class="no-data">관련 영상이 존재하지 않습니다</p>';
    return false;
  }
  data.forEach((video) => {
    let { key } = video;
    qySel(container).insertAdjacentHTML(
      "beforeend",
      `
      <button value="${key}">
        <img src = "https://img.youtube.com/vi/${key}/mqdefault.jpg" alt>
      </button>  
    `
    );
  });

  qySelAll(`${container} button`).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      qySel(".video-modal").style.display = "block";
      let youtubeId = e.currentTarget.value;
      qySel(
        ".video-modal iframe"
      ).src = `http://www.youtube.com/embed/${youtubeId}?playlist=${youtubeId}&autoplay=1&loop=1&mute=1&playsinline=1`;
      videoResize();
    });
  });
}; //displayVideos

export const displayImages = (data, container) => {
  if (!data.length) {
    qySel(container).innerHTML =
      '<p class="no-data">관련 이미지가 존재하지 않습니다</p>';
    return false;
  }
  data.forEach((img) => {
    let { file_path } = img;
    let imgPathOriginal = `${imgPaths.original}${file_path}`;
    let imgPathW500 = `${imgPaths.w500}${file_path}`;
    qySel(container).insertAdjacentHTML(
      "beforeend",
      `
      <a class="viewbox-btn" href="${imgPathOriginal}">
        <img src="${imgPathW500}" alt>
      </a>
    `
    ); //insertAdjacentHTML
  }); //forEach

  $(".viewbox-btn").viewbox();
}; //displayImages
