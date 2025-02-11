//*****************************************/
// 2. FELADAT
//*****************************************/
const navElem = document.querySelector("nav");

// handler, akkor alkalmazzuk a stílusosztályt, ha 200 pixnél többet gördültünk,
// lehetne elágazáson belül classList.add(), classList.remove(),
// de a toggle szebb megoldás itt
const onScroll = () => {
  const isApplied = window.scrollY > 200;
  navElem.classList.toggle("navbar-scrolled", isApplied);
};

// mivel a scroll event gyakran hívódik meg alapból, komolyabb logikával egészen költséges
// tud lenni. Ennek kezelésére egy technika az EVENT THROTTLING. Ennek lényege nagyjából az,
// hogy azt kontrolláljuk, hogy egy függvény hányszor hajtódik végre egy adott perióduson belül.
// Ez azért nagyon jó itt, mert biztosítja azt, hogy a függvén fix intervallumonként hajtódik végre,
// MÉG AKKOR IS, ha a kiváltó esemény gyakrabban következik be.

// itt a "lodash" függvénykönyvtárat használtuk (https://www.jsdelivr.com/package/npm/lodash),
// annak pedig a _.throttle függvényét, paraméterként megkapta a függvényünket, illetve az intervalt.
window.addEventListener("scroll", _.throttle(onScroll, 500));

// (hasonló fogalom, de nem összekeverendő a DEBOUNCING. Ilyenkor a függvény egy konkrét delay után
// hajtódik végre az utolsó event bekövetkezesé után. Ha egy event újra bekövetkezik a várakozási időszakban,
// akkor az időzító nullázódik, újra elkezdi levárni az elejétől a megadott delayt. Értsd: itt ha ezt a
// technikát használnánk pl 2000 milliszekudummal, akkor miután abbahagytuk a görgetést, levárná ezt a 2mp-t, és
// aztán hajtódna végre a callback. Ha pl 1.3 másodperc várakozás után görgetnénk egyet, újrakezdené a várást nulláról.)

//*****************************************/
// 3. FELADAT
//*****************************************/
// Intersection Observer API - talán az óra legfontosabb része.
// (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
// Arra a problémára ad nagyon jó megoldást, ha két gyerek-szülő kapcsolatban lévő elem
// "metszését" akarjuk vizsgálni. Adott esetben ezzel tudjuk kezelni azt, hogy valami éppen
// látható-e a képernyőn: ilyenkor a viewport az "ancestor" (by default a viewport az).
// A következő lépésekben érdemes haladni:

// 1. létrehozzuk az observer objectet, paraméterül kap egy callbacket és egy options objectet,
// ebben megadjuk a thresholdot: mekkora arányú láthatóság esetén szeretnénk a callback függvényt végrehajtani.
// Ha ez 0.0, akkor pont akkor, amikor megjelenik a target elemünk, ha 1.0, akkor abban az esetben, ha teljesen
// látható/teljes része benne van az ancestorban. Itt egy tömböt is meg tudunk adni, ilyenkor azokban az esetekben hajtja
// végre a callbacket, pl threshold: [0.0, 0.1, 1.0]. További dolgokat is megadhatunk itt, erről a fenti linken tudtok olvasni.

// 2. megírjuk a callback függvényt. Ilyenkor a callback mindig az entry-ket kapja meg paraméterül, amikre teljesül a
// megadott treshold. Ezeken végigmegyünk általában egy forEach segítségével. Itt tudunk különböző tulajdonságokat ellenőrizni,
// minket általában az isIntersecting érdekel (metszik-e a target element éppen az observer root elementjét). De pl
// le lehet kérdezni az intersectionRatio-t is, ha ennek fényében akarunk valamit végrehajtani. Szintén részletesebben a linken.

// 3. megmondjuk az observernek, hogy mik azok az elemek, amiket szeretnénk megfigyelni. Ha itt több ilyen elem van, akkor
// nyilván mindegyikre rá kell kötnünk.
const dataScrollElements = document.querySelectorAll("[data-scroll]");

const onObserve = (entries) => {
  entries.forEach((entry) => {
    const target = entry.target;
    const animation = target.dataset.scrollAnimation;

    target.classList.toggle("animate__animated", entry.isIntersecting);
    target.classList.toggle(`animate__${animation}`, entry.isIntersecting);
  });
};

const observer = new IntersectionObserver(_.throttle(onObserve, 500), {
  threshold: 0.0,
});

dataScrollElements.forEach((dse) => observer.observe(dse));
