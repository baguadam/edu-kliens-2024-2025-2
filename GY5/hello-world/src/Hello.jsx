/* eslint-disable react/prop-types */
const users = [
  { id: 1, name: "Barna", sex: "male" },
  { id: 2, name: "Botond", sex: "male" },
  { id: 3, name: "Bogi", sex: "female" },
  { id: 4, name: "Eszter", sex: "female" },
];

const Hello = ({ name, children }) => {
  // const age = 23;

  //   if (name === "") {
  //     return <h1>Hát Te ki vagy?</h1>;
  //   } else {
  //     return (
  //       <>
  //         <h1>
  //           Hello, {name}, nem vagy még öreg: {age}!
  //         </h1>
  //         <p>Jó, hogy itt vagy!</p>
  //       </>
  //     );
  //   }

  const femaleUsers = users.filter((user) => user.sex === "female");

  return name === "" ? (
    <h1>HÁT TE KI VAGY?</h1>
  ) : (
    <>
      <h1>Hello, {name}</h1>
      {children}
      <ul>
        {femaleUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Hello;
