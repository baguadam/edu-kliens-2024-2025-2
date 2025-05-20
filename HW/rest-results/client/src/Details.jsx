export const Details = () => {
  return (
    <>
      <h2>Details</h2>
      <form>
        <div className="form-group">
          <label for="name">Name: </label>
          <input id="name" name="name" type="text"></input>
        </div>
        <div className="form-group">
          <label for="result">Result: </label>
          <input id="result" name="result" type="number"></input>
        </div>
        <button>Modify</button>
      </form>
    </>
  );
};
