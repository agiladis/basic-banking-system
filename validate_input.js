// is input empty
const isEmpty = (input) => {
  if (input == '') {
    return true;
  }

  return false;
};

// is input number
const isNumber = (input) => {
  if (isNaN(Number(input))) {
    return false;
  }

  return true;
};

// is input positive
const isPositive = (input) => {
  if (input >= 0) {
    return true;
  }

  return false;
};
// is input larger than balance

export { isEmpty, isNumber, isPositive };
