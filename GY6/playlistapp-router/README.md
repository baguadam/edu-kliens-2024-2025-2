# Myplaylist -- navigáció és layout

A feladatban komponensekre bontva szerepel egy alkalmazás. Az egyes komponensek egyelőre azonban egymás alatt jelennek meg!

1. Általában egy oldal közös elemei alkotják a layout-ot. Vezess be itt is egy `Layout` komponenst, ami a keret `div`-et és a `Menu`-t tartalmazza. Valahogy így szeretnénk használni:
   ```jsx
   <Layout>
     <Home>
     <Playlists>
   </Layout>
   ```
2. Szeretnénk a menüt működőképessé tenni, és az egyes menüpontokra kattintva a megfelelő komponenseket megjeleníteni, azaz az oldalon belül navigálni.
   1. Telepítsd fel ehhez a react-router-dom csomagot. [Használd a dokumentációt is!](https://reactrouter.com/docs/en/v6)
   2. Segítségével oldd meg, hogy az egyes végpontokon a megfelelő komponensek jelenjenek meg. Ehhez a `BrowserRouter`, a `Routes` és a `Route` komponenseket kell használnod.
   3. Tedd működőképessé a menüt! Cseréld ki a linkeket `Link` vagy sokkal inkább `NavLink` komponensekre!
   4. Próbáld meg a `Layout` komponenst legfelsőbb szintű route-ként használni, és benne szereplő route-okkal megjeleníteni az oldalakat. Ehhez az `Outlet` komponensre is szükséged lesz a `Layout`-on belül. Oldd meg, hogy a `<Home>` komponens legyen az alapértelmezett (`index` prop) és ismeretlen végpontnál irányítson erre az oldalra (`<Navigate>` komponens)!
3. A `Playlists` komponens egyelőre beégetve tartalmazza, melyik playlist van kiválasztva. Konstans adat helyett alakítsd át state-é, és egy playlistre kattintással változtassuk meg a kiválasztott playlist-et.
4. Tüntessük fel az URL-ben, hogy a playlists oldalon melyik playlist van kiválasztva: pl. `/playlists/1`!
   1. Használd a router `useParams` hook-ját a paraméter kiolvasásához! Ügyelj arra, hogy ez szövegként érkezik, és még számmá kell alakítanod!
   2. Oldd meg, hogy egy playlist-re kattintva az URL megváltozzon, és onnan olvasd ki a kiválasztott playlist-et! Ehhez alakítsd át a `div`-eket `Link`-ekké!
5. Egészítsd ki a `Playlists` komponenst, hogy a playlist-en belüli trackek megjelenítésével és kiválasztásával!
   1. Jelenítsd meg a kiválasztott playlist-et a `TrackList` komponensben!
   2. Vezess be egy konstans értéket, hogy melyik track van kiválasztva és jelenítsd meg a kiválasztott track-et!
   3. Tedd ezt az értéket változtathatóvá!
   4. Olvasd ki ezt az értéket az URL-ből!
   5. Tedd kattinthatóvá a track-eket, hogy az URL-t módosítsák!
