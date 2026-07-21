import { useState, useEffect } from "react";
import "./App.css";

import Calculator from "./components/Calculator";
import Search from "./components/Search";
import ExcelImport from "./components/ExcelImport";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/firebase";

function App() {
  const [ratesData, setRatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
  const unsubscribe = onSnapshot(
    doc(db, "rates", "latest"),
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data().rates || [];

        setRatesData(data);

        localStorage.setItem(
          "ratesData",
          JSON.stringify(data)
        );

        console.log("Realtime Updated");
      }

      setLoading(false);
    },
    (error) => {
      console.error(error);
      setLoading(false);
    }
  );

  return () => unsubscribe();
}, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Rates...
      </h2>
    );
  }

  return (
    <>
      <Calculator ratesData={ratesData} />

      <Search ratesData={ratesData} />

      <div className="card">
        {!isAdmin ? (
          <button
            onClick={() => {
              const pass = prompt("Enter Admin Password");

              if (pass === "SMMART2026") {
                setIsAdmin(true);
                alert("Admin Login Successful");
              } else if (pass !== null) {
                alert("Wrong Password");
              }
            }}
          >
            🔒 Admin Login
          </button>
        ) : (
          <>
            <h3>✅ Admin Mode</h3>

            <ExcelImport setRatesData={setRatesData} />

            <button
              onClick={() => setIsAdmin(false)}
              style={{ marginTop: "10px" }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;