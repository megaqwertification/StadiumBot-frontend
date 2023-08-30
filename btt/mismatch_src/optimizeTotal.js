import munkres from "munkres-js";
import cloneDeep from "lodash.clonedeep";
import { timeToFrames, framesToTime } from "./frameConversion.js";

function calculateTotal(assignment, costMatrix) {
  return assignment.reduce((acc, [row, col]) => acc + costMatrix[row][col], 0);
}

function getLowestHelpfulImprovement(total, costMatrix, row, col) {
  let curTotal = total;
  let upperBoundTime = 0;
  let lowerBoundTime = costMatrix[row][col];

  const matrixCopy = cloneDeep(costMatrix);
  matrixCopy[row][col] = 0;
  const bestTotal = calculateTotal(munkres(matrixCopy), matrixCopy);
  while (true) {
    const midTime = Math.floor((upperBoundTime + lowerBoundTime) / 2);
    matrixCopy[row][col] = midTime;
    curTotal = calculateTotal(munkres(matrixCopy), matrixCopy);
    if (curTotal < bestTotal) {
      if (midTime === lowerBoundTime) {
        return framesToTime(-upperBoundTime);
      }
      lowerBoundTime = midTime;
    } else {
      if (midTime === lowerBoundTime) {
        return framesToTime(-lowerBoundTime);
      }
      upperBoundTime = midTime;
    }
  }
}

export function optimizeTotal(table) {
  const isFullMismatch = document.querySelector("input#full-mismatch").checked;
  const getWorstPairings = document.querySelector("input#worst-pairings")
    .checked;

  const costMatrix = [];
  const charStrings = [];
  const bodyRows = Array.from(table.rows).slice(1);

  bodyRows.forEach((row, charIndex) => {
    charStrings.push(row.cells[0].innerHTML);
    const bodyCells = Array.from(row.cells).slice(1);
    const timesClean = bodyCells.map((cell, stageIndex) => {
      if (isFullMismatch && charIndex === stageIndex) {
        return Infinity;
      }
      const timeString = cell.querySelector("input").value;
      const frames = timeToFrames(timeString);
      return frames === null ? Infinity : getWorstPairings ? -frames : frames;
    });
    costMatrix.push(timesClean);
  });
  const assignment = munkres(costMatrix);
  const total = calculateTotal(assignment, costMatrix);
  let lines = [];
  assignment.forEach(([row, col]) => {
    const line = getWorstPairings
      ? `${charStrings[row]} on ${charStrings[col]} (${
          bodyRows[row].cells[col + 1].querySelector("input").value
        } ➛ ${getLowestHelpfulImprovement(total, costMatrix, row, col)})`
      : `${charStrings[row]} on ${charStrings[col]} (${
          bodyRows[row].cells[col + 1].querySelector("input").value
        })`;
    lines.push(line);
  });
  bodyRows.forEach((row, charIndex) => {
    const assignedStageIndex = assignment.find(
      (val) => val[0] === charIndex
    )[1];
    const bodyCells = Array.from(row.cells).slice(1);
    bodyCells.forEach((cell, stageIndex) => {
      const input = cell.querySelector("input");
      input.style.backgroundColor =
        stageIndex === assignedStageIndex ? "cyan" : "white";
    });
  });
  document.querySelector("div#result-assignment").innerHTML = lines.join(
    "<br>"
  );
  document.querySelector("div#result-total").innerHTML = `Total: ${framesToTime(
    Math.abs(total)
  )}`;
}
