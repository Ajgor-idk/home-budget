const querySelect = (selector) => document.querySelector(selector);
const createElem = (element) => document.createElement(element);

const createModal = () => {
  const modal = createElem("div");
  const modalContent = createElem("div");
  const modalNameInput = createElem("input");
  const modalQuantityInput = createElem("input");
  const saveBtn = createElem("button");
  const cancelBtn = createElem("button");
  const inputsArrangment = createElem("div");
  const buttonsArrangment = createElem("div");
  const modalHeading = createElem("h3");
  saveBtn.innerText = "Save";
  cancelBtn.innerText = "Cancel";
  modalHeading.innerText = "Provide changes";
  modal.setAttribute("class", "modal");
  modalContent.setAttribute("class", "modal-content");
  saveBtn.setAttribute("class", "saveBtn");
  cancelBtn.setAttribute("class", "cancelBtn");
  modalNameInput.setAttribute("placeholder", "Provide a new name");
  modalNameInput.setAttribute("class", "modal-name");
  modalQuantityInput.setAttribute("placeholder", "Provaide a new amount");
  modalQuantityInput.setAttribute("class", "modal-amount");
  modalQuantityInput.setAttribute("type", "number");
  inputsArrangment.setAttribute("class", "inputs-arrangement");
  buttonsArrangment.setAttribute("class", "buttons-arrangement");
  modal.appendChild(modalContent);
  modalContent.appendChild(modalHeading);
  modalContent.appendChild(inputsArrangment);
  modalContent.appendChild(buttonsArrangment);
  inputsArrangment.appendChild(modalNameInput);
  inputsArrangment.appendChild(modalQuantityInput);
  buttonsArrangment.appendChild(saveBtn);
  buttonsArrangment.appendChild(cancelBtn);
  document.body.append(modal);
};

const closeModal = () => {
  const modal = querySelect(".modal");
  modal.remove();
};

//Function that sums up the income/outcome of chosem array.
const sumUp = (arrName, destination) => {
  let sum = 0;
  let allAmounts = [sum];
  arrName.forEach(({ amount }) => {
    allAmounts = [...allAmounts, amount];
  });
  sum = allAmounts.reduce(
    (prevAmount, currAmount) => Number(prevAmount) + Number(currAmount)
  );
  if (destination === incomeSum) {
    destination.innerText = "";
    destination.innerText = `Sum up of the income: ${sum} zł`;
  } else {
    destination.innerText = "";
    destination.innerText = `Sum up of the expenses: ${sum} zł`;
  }
};
