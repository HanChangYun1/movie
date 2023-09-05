import { options, ko, en, imgPaths } from "./api-data.js"
import { displayMovies, getMovie, getMovies, getVideos } from "./api-functions.js"
import { qySel, qySelAll, setSwiper, showModal, videoResize } from "./functions.js"

const setVisual = () => {
  return new Promise(async resolve => {
    let moviesData = await getMovies(options.playing)
    let movies = moviesData.results
    movies = movies.slice(0, 5)

    for (let movie of movies) {
      let { id, title, original_title, overview, backdrop_path } = movie
      if (!overview) {
        let movieEn = await getMovie(id, en)//영어로 된 영화정보를 가져온다
        overview = movieEn.overview
      }//if !overview
      overview = overview.slice(0, 150) + '...'

      let imgPath = `${imgPaths.original}${backdrop_path}`
      let videoData = await getVideos(id)
      if (videoData.results.length === 0) {
        videoData = await getVideos(id, en)
      }
      let videoKey = videoData.results[0].key
      qySel('.home-visual .swiper-wrapper').insertAdjacentHTML('beforeend', `
        <figure class="swiper-slide">
          <img src="${imgPath}" alt="">
          <figcaption>
            <small class="original-title">${original_title}</small>
            <h6 class="title">${title}</h6>
            <p class="overview">
              ${overview}
            </p>
            <button class="play-btn" value="${videoKey}">
              <i class="fa-brands fa-google-play"></i> 재생
            </button>
            <button class="detail-btn" value="${id}">
              <i class="fa-solid fa-circle-info"></i> 상세정보
            </button>
          </figcaption>
        </figure>
      `)//insertAdjacentHTML
    }//for of

    qySelAll('.home-visual .play-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        showModal('.video-modal')
        qySel('.video-modal iframe').src = `http://www.youtube.com/embed/${e.target.value}?playlist=${e.target.value}&autoplay=1&loop=1&mute=1&playsinline=1"`
        videoResize()
      })//click
    })//forEach

    qySelAll('.home-visual .detail-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        location.href = `./detail.php?id=${e.target.value}`
      })//click
    })//forEach

    setSwiper('.home-visual', 5000)

    resolve()
  })//promise
}//setVisual

const setHomeSection = (option, section) => {
  return new Promise(async resolve => {
    const moviesData = await getMovies(option)
    let movies = moviesData.results.slice(0,10)
    displayMovies(movies, `${section} .carousel .swiper-wrapper`,'swiper-slide')
    setSwiper(`${section} .carousel`, false, true)
    resolve()
  })//promise
}//setHomeSection

await setVisual()
await setHomeSection(options.popular, '.popular-section')
await setHomeSection(options.upcoming, '.upcoming-section')
await setHomeSection(options.rated, '.rated-section')
await setHomeSection(options.trend, '.trend-section')

const scrollToSection = () => {
  let headerH = matchMedia('screen and (min-width:1000px)').matches ? 80 : 60
  let offsetTop = qySel('.popular-section').getBoundingClientRect().y + window.scrollY
  let scrollTargetY = offsetTop - headerH
  window.scrollTo({
    top : scrollTargetY,
    behavior : 'smooth'
  }) 
}//scrollToSection

qySel('.home-visual').addEventListener('mousewheel',e=>{
  e.preventDefault()
  let delta = (e.wheelDelta < 0)? 1 : -1
  if(delta === -1) return false
  scrollToSection()
}, {passive:false})//mousewheel

qySel('.wheel-btn').addEventListener('click',e=>{
  scrollToSection()
})//click

