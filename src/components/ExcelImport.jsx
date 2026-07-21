import * as XLSX from "xlsx";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function ExcelImport({ setRatesData }) {
  async function handleFile(e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const workbook = XLSX.read(event.target.result, {
          type: "binary",
        });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const json = XLSX.utils.sheet_to_json(worksheet, {
          range: 6,
        });

        // React State
        setRatesData(json);

        // Local Storage
        localStorage.setItem("ratesData", JSON.stringify(json));

        // Firebase Save
        await setDoc(doc(db, "rates", "latest"), {
          rates: json,
          updatedAt: new Date().toISOString(),
        });

        alert(
          `Successfully Imported ${json.length} Records & Synced to Firebase`
        );
      } catch (error) {
        console.error("Firebase Error:", error);
        alert("Firebase Save Failed");
      }
    };

    reader.readAsBinaryString(file);
  }

  return (
    <div className="card">
      <h2>Excel Import</h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFile}
      />
    </div>
  );
}