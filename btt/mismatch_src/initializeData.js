// import { framesToTime } from "./frameConversion";
import { PASTED_DATA } from "./constants.js";

// export async function fetchRecordsAndWriteToTable(table) {
//   const response = await fetch(
//     "https://mismatch-bot-web.herokuapp.com/records/",
//     {
//       method: "GET"
//     }
//   );
//   const records = await response.json();
//   const [, ...bodyRows] = Array.from(table.rows);
//   bodyRows.forEach((inputRow, charIndex) => {
//     Array.from(inputRow.getElementsByTagName("input")).forEach(
//       (input, stageIndex) => {
//         const comboRecord = records[charIndex][stageIndex];
//         const recordString = comboRecord.is_partial
//           ? `${comboRecord.value} targets`
//           : framesToTime(comboRecord.value);
//         input.value = recordString;
//       }
//     );
//   });
//   console.log("wrote ");
// }

export function writePastedDataToTable(table) {
  const records = PASTED_DATA.split("\n").map((charRow) => charRow.split("\t"));
  const [, ...bodyRows] = Array.from(table.rows);
  bodyRows.forEach((inputRow, charIndex) => {
    Array.from(inputRow.getElementsByTagName("input")).forEach(
      (input, stageIndex) => {
        input.value = records[charIndex][stageIndex];
      }
    );
  });
  console.log(records);
}
