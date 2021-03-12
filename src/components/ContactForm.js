import React, { useState } from 'react';
import useFormWithErrors from '../hooks/useForm';
import DisplayComponent from './DisplayComponent';

const formData = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

const errorData = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

const ContactForm = () => {
  const [
    form,
    errors,
    handleFormChanges,
    handleSubmit,
    displayData,
  ] = useFormWithErrors(formData, errorData);

  return (
    <div className="App">
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            onChange={handleFormChanges}
            name="firstName"
            value={form.firstName}
            id="firstName"
            placeholder="Edd"
          />
          {errors.firstName && (
            <p data-testid="error">Error: {errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            onChange={handleFormChanges}
            id="lastName"
            name="lastName"
            value={form.lastName}
            placeholder="Burke"
          />
          {errors.lastName && (
            <p data-testid="error">Error: {errors.lastName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email*</label>
          <input
            onChange={handleFormChanges}
            id="email"
            name="email"
            value={form.email}
            placeholder="bluebill1049@hotmail.com"
          />
          {errors.email && <p data-testid="error">Error: {errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            onChange={handleFormChanges}
            name="message"
            id="message"
            value={form.message}
          />
          {errors.message && <p data-testid="error">Error: {errors.message}</p>}
        </div>

        {displayData && <DisplayComponent form={form} />}

        <input type="submit" data-testid="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
