import { CHARS } from "./constants.js";
import normalizeTimeInput from "./normalizeTimeInput.js";

function writeTableHeader(table, charStrings) {
  const stageHeader = table.querySelector("thead");
  stageHeader.style.textAlign = "left";
  const row = stageHeader.querySelector("tr");
  const newRow = document.createElement("tr");
  newRow.appendChild(document.createElement("th"));
  charStrings.forEach((char) => {
    const cell = document.createElement("th");
    cell.innerHTML = char;
    newRow.appendChild(cell);
  });
  stageHeader.replaceChild(newRow, row);
}

function writeTableRows(table, charStrings, onChange) {
  const body = table.querySelector("tbody");
  const newBody = document.createElement("tbody");
  charStrings.forEach((char) => {
    const charRow = document.createElement("tr");
    const headerCell = document.createElement("th");
    headerCell.innerHTML = char;
    headerCell.style.textAlign = "end";
    charRow.appendChild(headerCell);
    charStrings.forEach(() => {
      const timeCell = document.createElement("td");
      const input = document.createElement("input");
      input.size = 4;
      input.onchange = (e) => {
        const inputValue = e.target.value;
        normalizeTimeInput(input, inputValue);
        onChange();
      };
      timeCell.appendChild(input);
      charRow.appendChild(timeCell);
    });
    newBody.appendChild(charRow);
  });
  table.replaceChild(newBody, body);
}

export function initializeTable(table, onChange) {
  writeTableHeader(table, CHARS);
  writeTableRows(table, CHARS, onChange);
}
