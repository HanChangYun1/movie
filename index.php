<?php include "header.php" ?>
<script src="./js/home.js" type="module"></script>

<section class="home-visual">
  <div class="swiper-wrapper">
  </div><!-- swiper-wrapper -->

  <button class="prev"></button>
  <button class="next"></button>

  <button class="wheel-btn">
    <i class="fa-solid fa-arrow-down"></i>
  </button>
</section>

<main class="home-content">
  <section class="common-section movie-grid-section swiper-section popular-section">
    <h2>
      <i class="fa-solid fa-clapperboard"></i>
      <em>현재 인기 영화</em>
    </h2>
    <div class="carousel grid-container">
      <div class="swiper-wrapper">
        <!-- 동적생성 -->
      </div><!--swiper-wrapper-->
      <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
      <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
    </div><!--grid-container-->
  </section>

  <section class="common-section movie-grid-section swiper-section upcoming-section">
    <h2>
      <i class="fa-solid fa-calendar-days"></i>
      <em>최신, 개봉예정 영화</em>
    </h2>
    <div class="carousel grid-container">
      <div class="swiper-wrapper">
        <!-- 동적생성 -->
      </div><!--swiper-wrapper-->
      <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
      <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
    </div><!--grid-container-->
  </section>

  <section class="common-section movie-grid-section swiper-section rated-section">
    <h2>
      <i class="fa-solid fa-square-poll-vertical"></i>
      <em>평점이 높은 명작</em>
    </h2>
    <div class="carousel grid-container">
      <div class="swiper-wrapper">
        <!-- 동적생성 -->
      </div><!--swiper-wrapper-->
      <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
      <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
    </div><!--grid-container-->
  </section>

  <section class="common-section movie-grid-section swiper-section trend-section">
    <h2>
      <i class="fa-solid fa-comments"></i>
      <em>주간 화제의 영화들</em>
    </h2>
    <div class="carousel grid-container">
      <div class="swiper-wrapper">
        <!-- 동적생성 -->
      </div><!--swiper-wrapper-->
      <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
      <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
    </div><!--grid-container-->
  </section>

</main><!-- main -->

<?php include "video-modal.php" ?>
<?php include "footer.php" ?>