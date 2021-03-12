import React from 'react';
import { useState } from 'react';

const useFormWithErrors = (initialFormValues, initialErrorValues) => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialErrorValues);
  const [displayData, setDisplayData] = useState(false);

  const errorHandling = (fieldName, fieldValue) => {
    if (fieldName === 'firstName' && fieldValue.length < 5)
      return `${fieldName} must have at least 5 characters.`;

    const emailRegex = /(.*)@(.*)\.(.+)/g;
    if (fieldName === 'email' && !fieldValue.match(emailRegex))
      return `${fieldName} must be a valid email address.`;

    if (fieldName !== 'message' && fieldValue === '')
      return `${fieldName} is a required field.`;

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitErrors = {};
    Object.keys(errors).forEach((field) => {
      submitErrors[field] = errorHandling(field, values[field]);
    });

    setErrors(submitErrors);

    const hasErrors =
      submitErrors.firstName === '' &&
      submitErrors.lastName === '' &&
      submitErrors.email === '' &&
      submitErrors.message === '';
    setDisplayData(hasErrors);
  };

  const handleFormChanges = (e) => {
    const errorMessage = errorHandling(e.target.name, e.target.value);

    if (errorMessage !== '') {
      setDisplayData(false);
    }

    setErrors({
      ...errors,
      [e.target.name]: errorMessage,
    });
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return [values, errors, handleFormChanges, handleSubmit, displayData];
};

export default useFormWithErrors;
