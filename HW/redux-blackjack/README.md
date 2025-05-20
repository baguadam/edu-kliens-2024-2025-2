## 4. Simple Blackjack (4-redux-blackjack, 10 pont)

Készíts Redux segítségével egy egyszerűbb Blackjack alkalmazást! Jelen esetben a játékot két fő játsza (osztó és a felhasználó) egy pakli francia kártyával. Először a játékos húz kártyákat az előre összekevert pakliból, addíg amíg meg nem áll, vagy túl nem lépi a 21-et (minden kártya értéke a rajta lévő szám; az ász, bubi, dáma és király mind 10-et ér). Az nyer, akinek a kártyáinak összértéke közelebb van a 21-hez és nem lépi azt túl.

Lehetséges állapottér:

```js
{
   deck: [],
   hands: {
      player: [],
      dealer: []
   },
   isGameStarted: false,
   isPlayerRoundDone: false,
   roundWinner: null,
   winnings: {
      player: 0,
      dealer: 0
   }
}
```

Lehetséges action-ök:

- `NEW_GAME`: új játék kezdése
- `NEXT_CARD`: játékos új kártyát húz a pakli tetejéről
- `PLAYER_FINISHED`: játékos jelzi, hogy megáll
- `DEALER_ROUND`: osztó köre

Előre megírt segédfüggvények az utils/blackJackUtils.js -ben:

- `getSymbolFromCardId(id)`: visszaadja egy kártyához tartozó szimbólumot (id: [0-51])
- `getValueFromCardId(id)`: visszaadja egy kártya értékét (id: [0-51])
- `getValueOfCards(hand)`: visszaadja egy játékos kártyáinak összértékét

Az alkalmazás tartalmaz még egy Card és egy Hand komponenst, amelyek 1-1 kártya, valamint 1-1 kártyasorozat elemeit jelenítik meg.

Feladatok:

- a. (1 pont) A kártyákat 0-51 egész számokkal reprezentáljuk. Készíts egy 52 elemű tömböt, ami a kártyákat tárolja (0. eleme 0, 1. eleme 1, stb), majd keverd össze (a lodash `shuffle` függvénye ebben segíthet). A pakli tartalmát írd ki konzolra!
- b. (1 pont) Lehessen új játékot kezdeni a "New game" gombra kattintva! Küldj egy `NEW_GAME` akciót, amely során az állapottér elemei inicializálásra kerülnek (a deck megkeverve, a kezek üresek, stb).
- c. (2 pont) A játékos tudjon új kártyát felhúzni ("Get New Card" gomb, `NEXT_CARD` akció)! Ekkor a pakli tetején lévő kártya a játékos kezébe kerül. Ha kártyáinak összértéke meghaladja a 21-et (ld. `getValueOfCards` segédfüggvényt), akkor már ne tudjon (`isPlayerRoundDone` legyen igaz)! A kártyák jelenjenek is meg a felületen!
- d. (1 pont) A játékos tudja befejezni a körét ("Stop" gomb, `PLAYER_FINISHED` akció, `isPlayerRoundDone` igazzá válik))! A "Get New Card" és "Stop" gombok inaktívvá válnak, a "Play Dealer" aktívvá.
- e. (2 pont) El lehessen indítani az osztó körét, amennyiben a játékos már befejezte a sajátját ("Play Dealer" gomb, `DEALER_ROUND` akció). Ekkor a pakli tetejéről addig kerülnek lapok az osztóhoz, amíg el nem éri a 16-ot, 16 felett megáll (ld. `getValueOfCards` segédfüggvényt). A kártyák megjelennek az osztó alatt!
- f. (1 pont) Mindkét játékos pontszáma folyamatosan látszódjón a kártyáik alatt!
- g. (2 pont) A kör végén az aktuális nyertes felületi szinten is kerüljön jelzésre, majd eltárolásra. A `DEALER_ROUND` akciónál a pontok alapján vagy a játékos, vagy az osztó nyer, a megfelelő `winnings` 1-gyel növelendő. A jelenlegi állás kerüljön megjelenítésre! (például: a név mellett zárójelben)
