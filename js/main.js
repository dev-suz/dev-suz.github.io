function toggleMenu() {
  const $navMenu = document.getElementById('nav__menu');
  // classList.toggle() 토글
  $navMenu.classList.toggle('show');
}

function handleFloatingButton() {
  const $floatingButton = document.getElementById('floating-button');
  $floatingButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth',
    });
  });
}

function init() {
  const $navToggle = document.getElementById('nav-toggle');
  $navToggle.addEventListener('click', () => {
    // Menu Toggle
    toggleMenu();
  });

  const $navLinkList = document.querySelectorAll('.nav__link');
  $navLinkList.forEach((el) => el.addEventListener('click', toggleMenu));

  handleFloatingButton();
}

init();

const options = {
  // 화면 감지 임계
  threshold: 0.5,
};

// 브라우저 API 활용 - InterserctionObserver
// 관찰대상(entries)를 받아서 그 관찰대상이 화면에 보일경우(entry.isIntersecting== true) 그 대상의 클래스리스트에 추가(entry.target.classList.add or remove)

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const sectionId = entry.target.id;
    if (entry.isIntersecting) {
      // entry.target.classList.add('bg-dark');
      document
        .querySelector(`.nav__link[href*=${sectionId}`)
        .classList.add('active-link');

      // 타겟 제외 나머지 섹션ids
      const $theOthers = document.querySelectorAll(
        `.nav__link:not([href*=${sectionId}])`,
      );
      console.log($theOthers);
      $theOthers.forEach((section) => section.classList.remove('active-link'));
    } else {
      // entry.target.classList.remove('bg-dark');
    }
  });
}, options);

// 관찰대상 (섹션 전체)
const $sectionList = document.querySelectorAll('.section');
// forEach 돌면서 각 섹션 관찰하도록 명령 - observer.observe()
$sectionList.forEach((section) => observer.observe(section));

const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '60px', // 애니메이션 이동거리
  duration: 2000, // 지속시간 1000ms= 1s
  delay: 200, // 애니메이션 시작까지 딜레이 시간
});

scrollReveal.reveal(
  '.home__data, .about__img, .skills__text, .contact__input,  .contact__button ',
);
scrollReveal.reveal('.home__img, .about__data, .skills__img', { delay: 400 });
scrollReveal.reveal('.skills__data, .work__link', { interval: 200 });

const typeit = new TypeIt('#typeit', {
  speed: 70,
  startDelay: 1300,
  waitUntilVisible: true,
});

typeit
  .type('안녕하세요!<br />')
  .type(
    '<strong class="home__title-color">우직한 걸음으로<br/>성장하는 개발자</strong><br />',
  )
  .type('<strong class="home__title-color">함선우</strong>입니다.<br/>', {
    delay: 300,
  })
  .delete(8, { delay: 700 })
  .type('<strong class="home__title-color">함선우</strong>입니다.')
  .go();
