# To-Do-App

1. Importáld be az `App` komponensbe a `data/tasks` tartalmát valamilyen néven!

2. Küldd le a beimportált adatokat a `TaskList` komponensnek, szedd ki megfelelően a `props`-ból, logold ki az érkezett értékeket!

3. Jelenítsd meg a `TaskItem`-eket a `TaskList`en belül az érkezett adatoknak megfelelően. Alkalmazd a `completed` stílusosztályt az adott task állapotától függően, illetve a checkboxok is megfelelően legyen ki- vagy bepipálva!

4. Legyen lehetőség task törlésére! Ehhez először létre kell hoznunk egy `state`-et a taskoknak. Az `App` komponensben készíts egy `removeTask` methodot, ami megfelelően meghívja a `tasks` setterét! Csorgasd le ezt a `TaskItem`-ig, ahol használd a törlés gombon az `onClick` eseménnyel!

5. Legyen lehetőség módosítani, hogy az adott feladat teljesítt-e vagy sem. Ehhez készíts az `App` komponensben egy `toggleTaskCompletion` methodot, ami megfelelően módosítja a state-et. Csorgasd le ezt a `TaskItem`-nek, ott használd a checkbox `onChange` eseményével!
