import { useState, useEffect } from "react";
import Mapping from "./Mapping";
import { calculateLess, calculateAdd } from "../utils/calculator";
import { generateCode } from "../utils/codeGenerator";

export default function Calculator() {
  const [degreeNo, setDegreeNo] = useState("");
  const [rate, setRate] = useState("");
  const [percent, setPercent] = useState(12);

  const [lessAmount, setLessAmount] = useState("0.00");
  const [addAmount, setAddAmount] = useState("0.00");
  const [finalRate, setFinalRate] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!rate || Number(rate) <= 0) {
      setLessAmount("0.00");
      setAddAmount("0.00");
      setFinalRate("");
      setCode("");
      return;
    }

    const less = calculateLess(Number(rate), percent);
    const add = calculateAdd(Number(rate), percent);

    setLessAmount(less.lessAmount);
    setAddAmount(add.addAmount);

    // Default me Less Rate dikhayenge
    setFinalRate(less.finalRate);

    // IMPORTANT: Code ORIGINAL RATE ka banega
    setCode(generateCode(Number(rate)));
  }, [rate, percent]);

  function handleLess() {
    if (!rate) return;

    const less = calculateLess(Number(rate), percent);

    setLessAmount(less.lessAmount);
    setAddAmount("0.00");
    setFinalRate(less.finalRate);

    // Original Rate ka Code
    setCode(generateCode(Number(rate)));
  }

  function handleAdd() {
    if (!rate) return;

    const add = calculateAdd(Number(rate), percent);

    setAddAmount(add.addAmount);
    setLessAmount("0.00");
    setFinalRate(add.finalRate);

    // Original Rate ka Code
    setCode(generateCode(Number(rate)));
  }

  function resetAll() {
    setDegreeNo("");
    setRate("");
    setPercent(12);

    setLessAmount("0.00");
    setAddAmount("0.00");
    setFinalRate("");
    setCode("");
  }

  return (
    <div className="card">

      <h1>EVENT RATE SYSTEM PRO</h1>

      <div className="summary">

        <div className="summaryBox">
          <h4>Original</h4>
          <h2>{rate || 0}</h2>
        </div>

        <div className="summaryBox">
          <h4>Final</h4>
          <h2>{finalRate || 0}</h2>
        </div>

        <div className="summaryBox">
          <h4>Code</h4>
          <h2>{code || "---"}</h2>
        </div>

      </div>

      <label>Degree No.</label>

      <input
        type="text"
        value={degreeNo}
        onChange={(e) => setDegreeNo(e.target.value)}
        placeholder="Enter Degree No."
      />

      <label>Original Rate</label>

      <input
        type="number"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        placeholder="Enter Original Rate"
      />

      <label>Discount / Add Percentage</label>

      <select
        value={percent}
        onChange={(e) => setPercent(Number(e.target.value))}
      >
        <option value={5}>5%</option>
        <option value={8}>8%</option>
        <option value={10}>10%</option>
        <option value={12}>12%</option>
        <option value={15}>15%</option>
        <option value={18}>18%</option>
      </select>

      <div className="btnRow">

        <button onClick={handleLess}>
          LESS
        </button>

        <button onClick={handleAdd}>
          ADD
        </button>

        <button onClick={resetAll}>
          RESET
        </button>

      </div>

      <div className="result">

        <p><b>Less Amount :</b> {lessAmount}</p>

        <p><b>Add Amount :</b> {addAmount}</p>

        <p><b>Final Rate :</b> {finalRate}</p>

        <p><b>Code :</b> {code}</p>

      </div>

      <Mapping code={code} />

    </div>
  );
}