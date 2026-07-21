export default function Mapping({ code }) {
  const data = [
    { digit: 0, letter: "A" },
    { digit: 1, letter: "B" },
    { digit: 2, letter: "C" },
    { digit: 3, letter: "D" },
    { digit: 4, letter: "E" },
    { digit: 5, letter: "F" },
    { digit: 6, letter: "G" },
    { digit: 7, letter: "H" },
    { digit: 8, letter: "I" },
    { digit: 9, letter: "J" },
  ];

  return (
    <div className="mapping">

      <h2>Digit Code Mapping</h2>

      <div className="mapping-grid">

        {data.map((item) => {

          const active = code.includes(item.letter);

          return (

            <div
              key={item.digit}
              className={active ? "box active" : "box"}
            >
              <h3>{item.digit}</h3>

              <h1>{item.letter}</h1>

            </div>

          );

        })}

      </div>

    </div>
  );
}