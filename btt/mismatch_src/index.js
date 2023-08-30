import { initializeOptions } from "./initializeOptions.js";
import { initializeTable } from "./initializeTable.js";
import { optimizeTotal as optimizeTotalForTable } from "./optimizeTotal.js";
import {
  // fetchRecordsAndWriteToTable,
  writePastedDataToTable
} from "./initializeData.js";
// import "./styles.css";

async function app() {
  const table = document.querySelector("table");
  const isFullMismatchCheckbox = document.querySelector("input#full-mismatch");
  const getWorstPairingsCheckbox = document.querySelector(
    "input#worst-pairings"
  );
  const optimizeTotal = () => {
    optimizeTotalForTable(table);
  };

  initializeTable(table, optimizeTotal);
  initializeOptions(
    [isFullMismatchCheckbox, getWorstPairingsCheckbox],
    optimizeTotal
  );

  writePastedDataToTable(table);
  // await fetchRecordsAndWriteToTable(table);
  optimizeTotal();
}

if (document.readyState !== "loading") {
  app();
} else {
  document.addEventListener("DOMContentLoaded", app);
}
