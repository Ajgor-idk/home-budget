import { v4 as uuidv4 } from "https://jspm.dev/uuid";

//All the necessary DOM objects.
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

//Two main arrays for storing info about products.
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
  //Creating primary income list elements.
  incomeList.innerHTML = "";
  incomeProducts.map(({ name, amount, id, arrType }) => {
    const li = createElem("li");
    const liArrangament = createElem("div");
    const buttonWrapper = createElem("div");
    const editBtn = createElem("button");
    const deleteBtn = createElem("button");
    editBtn.setAttribute("class", "edit-btn");
    deleteBtn.setAttribute("class", "delete-btn");
    liArrangament.setAttribute("class", "liArrangament");

    //Adds text, products and buttons to the list items.
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    name = name[0]?.toUpperCase() + name.slice(1);
    li.innerHTML = `${name} - ${amount} zł`;
    liArrangament.appendChild(li);
    liArrangament.appendChild(buttonWrapper);
    buttonWrapper.appendChild(editBtn);
    buttonWrapper.appendChild(deleteBtn);
    incomeList.appendChild(liArrangament);

    //Deletes products from income list.
    deleteBtn.addEventListener("click", () => {
      incomeProducts = incomeProducts.filter(
        ({ id: productId }) => productId !== id
      );
      renderApp();
    });

    //Adds modal which edits the items.
    editBtn.addEventListener("click", () => {
      createModal();
      const saveBtn = querySelect(".saveBtn");
      const cancelBtn = querySelect(".cancelBtn");
      const modalQuantityInput = querySelect(".modal-amount");
      const modalNameInput = querySelect(".modal-name");
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

//Function that tells the user how much balance does he have left.
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
  //Creating primary expense list elements.
  expensesList.innerHTML = "";
  expenseProducts.map(({ name, amount, id, arrType }) => {
    const li = createElem("li");
    const editBtn = createElem("button");
    const deleteBtn = createElem("button");
    const liArrangament = createElem("div");
    const buttonWrapper = createElem("div");
    editBtn.setAttribute("class", "edit-btn");
    deleteBtn.setAttribute("class", "delete-btn");
    liArrangament.setAttribute("class", "liArrangament");

    //Adds text, products and buttons to the list items.
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    name = name[0]?.toUpperCase() + name.slice(1);
    li.innerHTML = `${name} - ${amount} zł`;
    liArrangament.appendChild(li);
    liArrangament.appendChild(buttonWrapper);
    buttonWrapper.appendChild(editBtn);
    buttonWrapper.appendChild(deleteBtn);
    expensesList.appendChild(liArrangament);

    //Deletes products from expense list.
    deleteBtn.addEventListener("click", () => {
      expenseProducts = expenseProducts.filter(
        ({ id: productId }) => productId !== id
      );
      renderApp();
    });

    //Adds modal which edits the items.
    editBtn.addEventListener("click", () => {
      createModal();
      const saveBtn = querySelect(".saveBtn");
      const cancelBtn = querySelect(".cancelBtn");
      const modalQuantityInput = querySelect(".modal-amount");
      const modalNameInput = querySelect(".modal-name");
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

//Adds products given by user to the primary arrays.
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
    let amount = incomeQuantityInput.value;
    const id = uuidv4();
    const arrType = "income";
    incomeQuantityInput.value = "";
    incomeNameInput.value = "";
    if (amount < 0) amount = (amount * -2) / 2;
    incomeProducts = [...incomeProducts, { name, amount, id, arrType }];
  } else if (arrName == expenseProducts) {
    const name = expenseNameInput.value;
    let amount = expenseQuantityInput.value;
    const id = uuidv4();
    const arrType = "outcome";
    expenseQuantityInput.value = "";
    expenseNameInput.value = "";
    if (amount < 0) amount = (amount * -2) / 2;
    expenseProducts = [...expenseProducts, { name, amount, id, arrType }];
  }
  renderApp();
};
