import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', () => {
  render(<ContactForm />);
});

test('renders the contact form header', () => {
  render(<ContactForm />);
  const header = screen.getByText(/contact form/i);

  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  userEvent.type(firstNameInput, 'abc');
  await waitFor(() => {
    const error = screen.findByTestId(/error/i);
    error.then((res) => {
      expect(res).toBeInTheDocument();
    });
  });
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />);
  const submitBtn = screen.getByTestId(/submit/i);

  userEvent.click(submitBtn);
  await waitFor(() => {
    const errors = screen.findAllByTestId(/error/i);
    errors.then((res) => {
      expect(res).toBeTruthy();
      expect(res).toHaveLength(3);
    });
  });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const submitBtn = screen.getByTestId(/submit/i);

  userEvent.type(firstNameInput, 'Billy');
  userEvent.type(lastNameInput, 'Bob');
  userEvent.click(submitBtn);

  await waitFor(async () => {
    const error = await screen.findByTestId(/error/i);
    const erorrByText = await screen.findByText(
      /email must be a valid email address./i
    );
    expect(error).toBeInTheDocument();
    expect(erorrByText).toHaveTextContent(
      /email must be a valid email address./i
    );
  });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {});

test('renders all fields text when all fields are submitted.', async () => {});
