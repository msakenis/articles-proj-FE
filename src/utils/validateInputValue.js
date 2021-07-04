const validateInputValue = ({value}) => {
  const regexForAlphanumeric = new RegExp(/^[\w\-\s]+$/);

  if (!value) {
    return {error: false};
  } else if (value?.length >= 40) {
    return {error: true, message: 'Max 40 characters allowed'};
  } else if (regexForAlphanumeric.test(value) === false) {
    return {error: true, message: 'Only alphanumeric characters allowed'};
  } else {
    return {error: false, message: 'success'};
  }
};

export default validateInputValue;
