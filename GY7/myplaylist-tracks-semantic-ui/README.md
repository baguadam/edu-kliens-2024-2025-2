# Myplaylist app: track-ek kezelése

Ebben a feladatban elő van készítve egy lejátszási listákat kezelő alkalmazás track-ekért felelős oldala: csak ez az oldal jelenik meg, nincs routing, menü. A `Tracks` komponens felel az oldal tartalmáért és jeleníti meg a példaadatban szereplő track-eket a `Track` komponensben. A `TrackForm` komponens egy felugró modális dialógusablakot definiál. Az alkalmazás a Semantic UI komponenskészletét használja!

1. Elemezd a keretprogramot! Vizsgáld meg, hogy a példaadat hogyan jelenik meg az oldalon!
2. A modális ablak (`TrackForm`) megjelenítése
   1. Az [alap Semantic UI](https://semantic-ui.com/modules/modal.html#/definition) a komponensek viselkedését imperatívan oldja meg. Azért, hogy ez ne ütközzön a React deklaratív megközelítésével használjuk a [Semantic UI React-es változatát](https://react.semantic-ui.com/modules/modal/)! A `package.json` már tartalmazza a szükséges függőséget, telepítsük!
   2. Írjuk át a `TrackForm` komponens legkülsőbb `div`-jét `Modal` komponensre! Elemezd a `Modal` tulajdonságait!
   3. Oldd meg, hogy a `Tracks` komponensben az "Add new track" gombra kattintva megjelenjen a modális dialógusablak! Ehhez vezess be egy `open` állapotváltozót és ezt kösd rá a `Modal` `open` tulajdonságára! A gombra kattintva változtasd meg az `open` értékét (`handleOpen`)!
   4. A modális dialóguablakból kilépve (Cancel gombra vagy X-re kattintva), tüntessük el a dialógusablakot az `open` érték megváltoztatásával (`handleClose`)! Használd ehhez a `Modal` `onClose` metódusát!
3. Track hozzáadása
   1. Tedd szerkeszthetővé a `Field` komponensen belüli `input` mezőket! Használj controlled form component-eket!
   2. Ezekre az értékekre a `TrackForm` komponensnek is szüksége lesz. Ezért vezess be egy állapotváltozót a komponensen belül, amely tárolja az összes mező értékét (`formState`)! Legyen ez olyan struktúrájú, mint amit a `defaultState` mutat! Ezeket az értékeket jelenítsd meg a beviteli mezőkben!
   3. A beviteli mezők szerkesztésekor a változásokat vezesd vissza a `formState`-be! Az eseménykezelőben használj dinamikus tulajdonság neveket a hatékony megoldáshoz!
   4. A `Modal` komponens legyen egy űrlap! Ehhez be kell állítani az `as` tulajdonságát `form`-ra.
   5. Az űrlap elküldésekor írjuk ki a konzolra a `formState`-et, majd zárjuk be a dialógusablakot (`handleSubmit`)!
   6. Készítsük fel a `Tracks` komponenst arra, hogy a `TrackForm`-ból fogadni tudja a `formState` adatot mint új track-et (`handleSubmit`)! Adjuk is hozzá az új track-et az eddigi tracklistánkhoz!
   7. A validációt nagyon egyszerűen fogjuk most elvégezni: teljes egészében a HTML űrlapvalidátoraira támaszkodunk! A `Field` komponensnek adjuk meg a szükséges validátorokat, majd azokat alkalmazzuk a `Field`-en belüli beviteli mezőkre is!
   8. Oldjuk meg azt, hogy újabb track hozzáadásakor a dialógusablak üres mezőkkel jelenjen meg! Ezt úgy fogjuk megoldani, hogy a `TrackForm` komponensnek átadunk egy üres objektumot, és ezzel írjuk felül megnyitáskor a `formState`-ben a `defaultState`-et. A megnyitáskori reagáláshoz használj `useEffect`-et!
   9. Opcionálisan szervezd ki a `formState` kezelést egy egyedi hook-ba (pl. `useFormState`)! Így a `TrackForm` komponens áttekinthetőbbé válik, és az összetartozó állapotkezelés elkülönült egységként lesz jelen.
4. Track törlése
   1. A törlés gombra kattintva töröljük a kiválasztott track-et (`handleDelete`)!
5. Track módosítása
   1. A `Tracks` komponensben vezessünk be egy állapotváltozót, ami az éppen szerkesztendő track adatait tartalmazza (`editedTrack`)!
   2. A módosítás gombra kattintva állítsuk be ezt az állapotváltozót (`handleEdit`)!
   3. A kiválasztott track adatait adjuk át a `TrackForm` komponensnek, ami ezzel fogja inicializálni a beviteli mezőket.
   4. A `Tracks` komponenst fel kell készíteni arra, hogy a dialógusablakból érkező adatokat vagy újként kell felvenni, vagy módosítani kell!
   5. Módosítsuk a kiválasztott track-et!
   6. Az `editedTrack`-et állítsuk üresre új track létrehozásakor (`handleNew`)!
6. useTracksService hook
   1. Szervezd ki a Track-ek kezelését egy egyedi hook-ba, és csak a szükséges adatokat és metódusokat publikáld az azt használó komponens felé!
   2. Végezd el az `exampleTracks` betöltését a komponens megjelenésekor! Használj `useEffect`-et!
7. Context
   1. Próbáld meg a `useTracksService`-t contextbe csomagolni és a Provider értékeként publikálni (`TracksContext` és `TracksProvider`)!
   2. A `Tracks` komponensben használd a `useContext` hook-kal!
8. Tárolás
   1. Tároljuk el a track-eket localStorage-ban!
   2. Majd tároljuk el a track-eket indexedDB-ben! Ehhez használjuk a [`localForage` csomagot](https://github.com/localForage/localForage), amely egy localStorage-hoz hasonló API-n keresztül tudja aszinkron módon az indexedDB-t használni!
   3. A `useTracksService`-ben a memóriába (állapotba) írás mellett végezzük el a perzisztáló vagy olvasó műveleteket! Ügyelj arra, hogy aszinkron API-t használsz!
   4. Szervezd ki a perzisztáló műveleteket egy külön API osztályba!
