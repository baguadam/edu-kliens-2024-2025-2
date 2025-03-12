# Hello világ

Készíts egy Helló világ alkalmazást Reactben!

1. Készíts egy `<Hello>` komponenst, amely egy címsorban kiírja, hogy "Hello világ!"!
2. A komponensen belül tárolj el egy nevet, és azt jelenítsd meg!
3. Ha ez a név üres, akkor azt írd ki, hogy "Nincs kit üdvözölni"!
4. Egy konstansban tárold el, hogy hányszor írja ki az üdvözlést a komponens, és ennyiszer jelenítsd is meg a címsort!
5. Ha a név "React", akkor egy stílusosztályon keresztül narancssárgával jelenítsd meg a szöveget! A stílusdefiníció külső állományban legyen! Használd a `classnames` csomagot a megoldáshoz!
6. Érkezzen a név és a megjelenítés száma komponens attribútumként: `<Hello name="Győző" count="3">`. [Ellenőrizd a prop-ok típusát!](https://reactjs.org/docs/typechecking-with-proptypes.html#function-components)
7. Legyen lehetőség egyéb elemeket is megadni az üdvözlés alatt! Például:

   ```JSX
   <Hello>
     <p>A small message for you!</p>
   </Hello>
   ```
