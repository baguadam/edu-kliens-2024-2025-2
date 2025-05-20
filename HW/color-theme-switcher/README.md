# Color Theme Switcher

Készíts egy React alkalmazást, ami lehetővé teszi a felhasználó számára, hogy alkalmazás szintjén tudja változtatni a módot `sötétre` vagy `világosra`. Ehhez használj `Context`et!

1. Hozd létre a `ThemeContext`et, ami tárolja a jelenlegi módot, ez akár lehet string formájában (light vagy dark), de bármilyen más megoldás is jó. Írj egy `toggleTheme` függvényt, aminek a segítségével válthatunk a módok között.

2. Hozz létre egy `Navbar` komponenst, ahol használod Contextet (`useContext`), és az aktuális módnak megfelelően állítasz be háttérszínt/hasonló dolgokat. Legyen itt egy gomb, aminre kattintva változtathatjuk a módot.

3. Hozz létre egy `Content` komponenst, amiben elhelyesez egy container div-et, valamennyi szöveget, ezeket is megfelelően szabályozod a `ThemeContext` alapján.

4. Jelenítsd meg a dolgokat megfelelően. Ne felejts el `provide`-olni a Contextet!
