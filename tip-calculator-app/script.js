const inputs = document.querySelectorAll(".input-wrapper input");
const tipButtons = document.querySelectorAll("#tip-options button");
const tipInput = document.querySelector("#tip-options input");
const bill = document.getElementById("bill");
const peopleAmount = document.getElementById("people");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
const resetBtn = document.getElementById("reset-btn");

let tipPercentage = 0;

function calculateResults() {
  if (bill.value > 0 && peopleAmount.value > 0) {
    const tipPerPerson = (bill.value * tipPercentage) / peopleAmount.value;
    const totalPerPerson = tipPerPerson + bill.value / peopleAmount.value;
    tipAmount.innerText = `$${tipPerPerson.toFixed(2)}`;
    total.innerText = `$${totalPerPerson.toFixed(2)}`;
    resetBtn.disabled = false;
  } else {
    resetResults();
  }
}

function resetInputs() {
  tipPercentage = 0;
  inputs.forEach((inputEl) => {
    inputEl.value = "";
    delete inputEl.dataset.invalid;
    const formInput = inputEl.closest(".form-input");
    formInput.querySelector(".error-msg").hidden = true;
  });
  tipButtons.forEach((btn) => {
    delete btn.dataset.selected;
  });
  tipInput.value = "";
}

function resetResults() {
  tipAmount.innerText = "$0.00";
  total.innerText = "$0.00";
  resetBtn.disabled = true;
}

inputs.forEach((inputEl) => {
  inputEl.addEventListener("input", () => {
    const formInput = inputEl.closest(".form-input");
    const errorMsg = formInput.querySelector(".error-msg");

    if (inputEl.value === "0") {
      inputEl.dataset.invalid = "true";
      errorMsg.hidden = false;
    } else {
      delete inputEl.dataset.invalid;
      errorMsg.hidden = true;
    }

    calculateResults();
  });
});

tipButtons.forEach((tipBtn) => {
  tipBtn.addEventListener("click", () => {
    if (tipBtn.dataset.selected === "true") {
      delete tipBtn.dataset.selected;
      tipPercentage = 0;
    } else {
      tipButtons.forEach((btn) => {
        delete btn.dataset.selected;
      });
      tipInput.value = "";
      tipBtn.dataset.selected = "true";
      tipPercentage = tipBtn.value / 100;
    }

    calculateResults();
  });
});

tipInput.addEventListener("input", () => {
  if (tipInput.value != "") {
    tipButtons.forEach((btn) => {
      delete btn.dataset.selected;
    });
    tipPercentage = tipInput.value / 100;
  } else {
    tipPercentage = 0;
  }

  calculateResults();
});

resetBtn.addEventListener("click", () => {
  resetInputs();
  resetResults();
});
