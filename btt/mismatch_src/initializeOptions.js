export function initializeOptions(optionCheckboxes, onChange) {
    optionCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", onChange);
    });
  }
  