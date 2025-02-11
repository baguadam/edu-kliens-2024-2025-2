//*****************************************/
// 2. FELADAT / a
//*****************************************/
const navElem = document.querySelector("nav");

const onScroll = () => {
  const isApplied = window.scrollY > 200;
  navElem.classList.toggle("navbar-scrolled", isApplied);
};

// ez volt a legelső, legprimitívebb megoldás a 2. feladatra, ami tulajdonképpen csak annyiban tér el
// a végsőtől, hogy nem tesszük bele az onScroll-t a throttle-be. Persze, ez is tökéletesen működi látszólag,
// viszont sokkal többször hajtódik végre a callback fölöslegesen.
window.addEventListener("scroll", onScroll);

//*****************************************/
// 2. FELADAT / b
//*****************************************/
// aztán a callbackben implementáltunk egy egészen buta, egészen csúnya manuális megoldás a throttling-re,
// ami gondolati szinten közelít már ahhoz, amit el szeretnénk érni: ne hajtsuk végre olyan sokszor a callbacket.
let waiting = false;
const onScrollWithWaiting = () => {
  if (!waiting) {
    const isApplied = window.scrollY > 200;
    navElem.classList.toggle("navbar-scrolled", isApplied);

    setTimeout(() => (waiting = false), 1000); // 1mp után lefut, visszaállítja a waitinget false-re
    waiting = true; // waiting true lesz, így megakadályozva a további végrehajtást az elkövetkezendő másodpercben
  }
};

//*****************************************/
// 3. feladat
//*****************************************/
// kezdetben megnéztük lebutatíva a dolgot, bevettünk csupán egy darab elemet, amit figyelni szeretnénk, ez volt a
// services id-jú section h2-je. Mindent ugyanúgy csináltunk, mint a végső megoldásban, csak itt beégetett animációt adtunk meg
const serviceHeader = document.querySelector("#services h2");

const onObserve = (entries) => {
  entries.forEach((entry) => {
    // ...
  });
};

const observer = new IntersectionObserver(onObserve, {
  threshold: 0.0,
});

observer.observe(serviceHeader);
