import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const querySelect = (selector) => document.querySelector(selector);
const createElem = (element) => document.createElement(element);

const incomeList = querySelect("#incomeList");
const addIncomeBtn = querySelect("#addIncome");
const incomeNameInput = querySelect("#nameOfIncome");
const incomeQuantityInput = querySelect("#amountOfIncome");
const expensesList = querySelect("#expensesList");
const addExpenseBtn = querySelect("#addExpense");
const expenseNameInput = querySelect("#nameOfExpense");
const expenseQuantityInput = querySelect("#amountOfExpense");
const incomeSum = querySelect("#incomeSum");
const expenseSum = querySelect("#expenseSum");
let freeFunds = querySelect("#freeFunds");

let incomeProducts = [];
let expenseProducts = [];

const renderApp = () => {
  renderIncomeList();
  renderExpenseList();
  sumUp(incomeProducts, incomeSum);
  sumUp(expenseProducts, expenseSum);
  allFunds();
};

const renderIncomeList = () => {
  incomeList.innerHTML = "";
  incomeProducts.map(({ name, amount, id, arrType }) => {
    const li = createElem("li");
    const editBtn = createElem("button");
    const deleteBtn = createElem("button");
    editBtn.setAttribute("class", "edit-btn");
    deleteBtn.setAttribute("class", "delete-btn");

    //Adds text, products and buttons to the list
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    name = name[0].toUpperCase() + name.slice(1);
    li.innerHTML = `${name} - ${amount} zł`;
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    incomeList.appendChild(li);

    //Deletes products from income list.
    deleteBtn.addEventListener("click", () => {
      incomeProducts = incomeProducts.filter(
        ({ id: productId }) => productId !== id
      );
      renderApp();
    });

    //adds modal which edits the items
    editBtn.addEventListener("click", () => {
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
      modalQuantityInput.setAttribute("placeholder", "Provaide a new amount");
      modalQuantityInput.setAttribute("type", "number");
      inputsArrangment.setAttribute("class", "inputs-arrangment");
      buttonsArrangment.setAttribute("class", "buttons-arrangment");
      modal.appendChild(modalContent);
      modalContent.appendChild(modalHeading);
      modalContent.appendChild(inputsArrangment);
      modalContent.appendChild(buttonsArrangment);
      inputsArrangment.appendChild(modalNameInput);
      inputsArrangment.appendChild(modalQuantityInput);
      buttonsArrangment.appendChild(saveBtn);
      buttonsArrangment.appendChild(cancelBtn);
      document.body.append(modal);
      saveBtn.addEventListener("click", (event) =>
        editItem(
          arrType,
          id,
          modalQuantityInput.value,
          modalNameInput.value,
          event
        )
      );
      saveBtn.addEventListener("click", closeModal);
      cancelBtn.addEventListener("click", closeModal);
    });
  });
};

const editItem = (arrType, chosenId, newAmount, newName, event) => {
  event.preventDefault();
  if (arrType === "income") {
    incomeProducts = incomeProducts.map((product) =>
      product.id === chosenId
        ? { ...product, amount: newAmount, name: newName }
        : product
    );
  } else {
    expenseProducts = expenseProducts.map((product) =>
      product.id === chosenId
        ? { ...product, name: newName, amount: newAmount }
        : product
    );
  }
  renderApp();
};

const closeModal = () => {
  const modal = querySelect(".modal");
  modal.remove();
};

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

const allFunds = () => {
  let totalIncome = 0;
  let allIncomes = [totalIncome];
  let totalExpenses = 0;
  let allExpenses = [totalExpenses];
  let change = 0;
  incomeProducts.forEach(({ amount }) => {
    allIncomes = [...allIncomes, amount];
  });
  totalIncome = allIncomes.reduce(
    (prevAmount, currAmount) => Number(prevAmount) + Number(currAmount)
  );
  expenseProducts.forEach(({ amount }) => {
    allExpenses = [...allExpenses, amount];
  });
  totalExpenses = allExpenses.reduce(
    (prevAmount, currAmount) => Number(prevAmount) + Number(currAmount)
  );
  change = totalIncome - totalExpenses;

  if (change === 0) {
    freeFunds.innerText = "Balance equals zero";
  } else if (change > 0) {
    freeFunds.innerText = `You can spend ${change} zł`;
  } else {
    freeFunds.innerText = `You have a debt. You're negative ${change} zł`;
  }
};

const renderExpenseList = () => {
  expensesList.innerHTML = "";
  expenseProducts.map(({ name, amount, id, arrType }) => {
    const li = createElem("li");
    const editBtn = createElem("button");
    const deleteBtn = createElem("button");
    editBtn.setAttribute("class", "edit-btn");
    deleteBtn.setAttribute("class", "delete-btn");

    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";

    name = name[0].toUpperCase() + name.slice(1);
    li.innerHTML = `${name} - ${amount} zł`;

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    expensesList.appendChild(li);

    deleteBtn.addEventListener("click", () => {
      expenseProducts = expenseProducts.filter(
        ({ id: productId }) => productId !== id
      );
      renderApp();
    });

    editBtn.addEventListener("click", () => {
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
      modalQuantityInput.setAttribute("placeholder", "Provaide a new amount");
      modalQuantityInput.setAttribute("type", "number");
      inputsArrangment.setAttribute("class", "inputs-arrangment");
      buttonsArrangment.setAttribute("class", "buttons-arrangment");
      modal.appendChild(modalContent);
      modalContent.appendChild(modalHeading);
      modalContent.appendChild(inputsArrangment);
      modalContent.appendChild(buttonsArrangment);
      inputsArrangment.appendChild(modalNameInput);
      inputsArrangment.appendChild(modalQuantityInput);
      buttonsArrangment.appendChild(saveBtn);
      buttonsArrangment.appendChild(cancelBtn);
      document.body.append(modal);
      saveBtn.addEventListener("click", (event) =>
        editItem(
          arrType,
          id,
          modalQuantityInput.value,
          modalNameInput.value,
          event
        )
      );
      saveBtn.addEventListener("click", closeModal);
      cancelBtn.addEventListener("click", closeModal);
    });
  });
};

addIncomeBtn.addEventListener("click", (event) =>
  addItem(event, incomeProducts)
);
addExpenseBtn.addEventListener("click", (event) =>
  addItem(event, expenseProducts)
);

const addItem = (event, arrName) => {
  event.preventDefault();

  if (arrName == incomeProducts) {
    const name = incomeNameInput.value;
    const amount = incomeQuantityInput.value;
    const id = uuidv4();
    const arrType = "income";
    incomeQuantityInput.value = "";
    incomeNameInput.value = "";
    incomeProducts = [...incomeProducts, { name, amount, id, arrType }];
  } else if (arrName == expenseProducts) {
    const name = expenseNameInput.value;
    const amount = expenseQuantityInput.value;
    const id = uuidv4();
    const arrType = "outcome";
    expenseQuantityInput.value = "";
    expenseNameInput.value = "";
    expenseProducts = [...expenseProducts, { name, amount, id, arrType }];
  }
  renderApp();
};
