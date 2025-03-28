# Akasztófa játék

Készíts akasztófa játékot!

1. Elemezd a kiindulási projektet!
   - Telepítsd a szükséges függőségeket (`npm install`)!
   - Az `App` komponenstől kezdve nézd meg, milyen részekből áll az alkalmazás!
   - Változtass meg pár értéket, és nézd meg, akkor hogyan viselkedik!
2. A konstans állapottér alapján jeleníts meg adatokat! Készítsd elő az adatokat az egyes komponensek számára számított értékként, majd ezeket add át prop-ként! Haladj komponensről komponensre!
   1. `Word` komponens
   2. `Buttons` komponens
   3. `Result` komponens
   4. `Hangman` komponens
3. Oldd meg, hogy gombnyomásra lehessen tippelni!
   1. A tippelés során a `tips` tömb fog módosulni, ezért ezt konstans helyett rakd át state-be (`useState`)!
   2. Készíts egy eseménykezelő függvényt, és ezt add át a `Buttons` komponensnek! Egy gombra kattintva hívódjon meg az eseménykezelő függvény!
4. Ha a játék véget ért, akkor a gombok _helyett_ jelenjen meg a "New game" gomb! Erre kattintva lehessen új játékot kezdeni!
   1. A `tips` mellett a `word` is változni fog, ezért kerüljön ez is a state-be!
   2. Készítsd el a megfelelő eseménykezelő függvényt!
   3. A `wordList` szavak tömbje, ebből generálj véletlenszerűen egy új szót!
