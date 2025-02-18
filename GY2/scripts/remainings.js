//**************************************************
// TASK 4
// Progresszív fejlesztési elveket követve nem jó megoldás az, ha a progressbart a HTML kódban hagyjuk, ugyanis ennek a
// funckionalitása a JS-ben nyugszik. Így ha nincs JS, nyilván nem is fog működni, lesz egy üres, nem funkcionális rész az
// oldalon. Így célszerű ennek a HTML-jét is a scriptbe legenerálni, ezt tesszük az elején.

const body = document.querySelector("body");
const containerDiv = document.createElement("div");
containerDiv.innerHTML = `
    <div style="position: fixed; z-index: 2000; width: 100%">
      <div
        id="progress-div"
        style="height: 20px; background-color: green; width: 80%"
      ></div>
    </div>
`;
body.prepend(containerDiv);

const progressDiv = document.querySelector("#progress-div");

// a kalkuláció lényege:
// - a scrollY megadja, hogy hány pixelt gördültünk le az oldalon, ezt ugye nyilván a tetejéhez méri
// - a scrollHeight megadja, hogy milyen "hosszú" a dokumentumunk, beleértve a viewportban éppen látható és nem látható részeket
// - az innerHeight megadja a látható résznek a "hosszát"
// mivel a scrollY értéke a látható rész tetejéhez nézi a legördülést, így a teljes dokumentum hosszából ki kell vonnunk a
// látható résznek a magasságát az összehasonlításnál.

window.addEventListener(
  "scroll",
  _.throttle(() => {
    const perc = Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100
    );
    progressDiv.style.width = `${perc}%`;
  }),
  100
);

//**************************************************
// TASK5
// Erre háziban sok szép, kreatív megoldást láttam, köszi a beadott feladatokat.

const sectionsWithIds = [...document.querySelectorAll("section")].filter((s) =>
  s.hasAttribute("id")
);
// vagy: const sectionsWithIds = document.querySelector("section[id]");

const onActiveLinkObserve = (entries) => {
  entries.forEach((e) => {
    const id = e.target.id;
    const navLink = document.querySelector(`nav a[href="#${id}"]`);

    navLink.classList.toggle("active", e.isIntersecting);
  });
};

const activeLinkObserver = new IntersectionObserver(onActiveLinkObserve, {
  threshold: 0.9, // triggerelődik, ha majdnem teljesen a viewportban van
});

sectionsWithIds.forEach((s) => activeLinkObserver.observe(s));
