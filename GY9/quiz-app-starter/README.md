# QUIZ APP

## 1. LÉPÉS: Context létrehozása

1. Az `src/contexts` mappán belül hozd létre a `QuizContext.jsx`-et
2. Ezen belül készíts egy `context`et és egy `provider`t, ami

   - eltárolja a játékos aktuális pozícióját a kvízben: `currentStep`
   - eltárolja az válaszokat: `answers`
   - eltárolja, hogy a kvíz véget ért-e már: `isFinished`
   - biztosítja a következő metódusokat: `addAnswer()`, `reset()`, `finish()`

3. Exportáld mindkettőt: `QuizContext`, `QuizProvider`

<details>
<summary>HINT</summary>

Használd a következőket: `createContext`, `useState`, csomagold be a context értékét a `QuizProvider`be.

</details>

---

## 2. LÉPÉS: Hook létrehozása

1. Az `src/hooks` mappán belül hozd létre a `useQuiz.js`-t
2. Készíts el a `useQuize` custom hookot, ami a `useContext` segítségével visszaadja a contextet.

---

## 3. LÉPÉS: Kösd be a Providert

1. A `main.jsx`-en belül csomagold be az `App` komponenst a `QuizProvider`be!
