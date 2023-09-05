<?php include "header.php" ?>
<script src="./js/search.js" type="module"></script>
<figure class="slide"><!-- 동적생성 --></figure>

<main class="search-content">
  <form class="search-form">
    <fieldset class="search-keyword">
      <span class="search-icon">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input list="keyword-list" class="search-input" type="text" placeholder="영화제목을 입력하세요">
      <datalist id="keyword-list">
        <!-- option 동적 생성 -->
      </datalist>
      <button class="delete-btn" title="검색기록삭제" type="button">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </fieldset><!--search-keyword-->
    
    <fieldset class="genre-btns">
    </fieldset><!--genre-btns-->
  </form>

  <section class="common-section movie-grid-section wrap-section search-result-section">
    <h2>
      <i class="fa-solid fa-square-poll-vertical"></i>
      <em>검색결과</em>
    </h2>
    <div class="grid-container">
      <!-- 검색결과 동적 생성 -->
    </div>
  </section>
</main>
<div class="trigger"></div>
<?php include "footer.php" ?>