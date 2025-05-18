1. A `login` endpoint már megfelelően elő van készítve az alkalmazásban, így ennek az implementációja nincs szükség. Ugyanúgy működik, mint a korábban megírt.

2. Készítsük el a `student`-ekhez kapcsolódó query-ket és mutationöket. Ne felejtsük el, hogy ezek mind védett endpointok, így ahhoz, hogy megfelelően működjön, el kell küldenünk a tokent is:

```js
headers: {
    Authorization: `Bearer ${token}`,
},
```

- getStudents -> használjuk a `StudentList` komponensen belül, amit fetchelünk: `students`
- getStudent -> használjuk a `StudentDetails` komponensen belül, amit fetchelünk: `student/${id}`
- getStudentLessons -> használjuk a `StudentDetails` komponensen belül, amit fetchelünk: `student/${id}/lessons`
- deleteStudent -> használjuk a `StudentDetails` komponensen belül, ahova kimegy a kérés: `student/${id}`
