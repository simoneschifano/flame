const Landing = () => {
  const test = () => {
    fetch("https://opentdb.com/api.php?amount=5&category=11")
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <button onClick={test}>test</button>
    </div>
  );
};

export default Landing;
