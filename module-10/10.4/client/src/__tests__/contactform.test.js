import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from '../components/ContactForm';

// Mock console.log
console.log = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    // Clear any previous calls to console.log before each test
    jest.clearAllMocks();
  });

  it('renders the contact form and submits values correctly', () => {
    render(<ContactForm />);

    // Check if the form elements are present using simpler text matches
    expect(screen.getByLabelText('First name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Comments')).toBeInTheDocument();
    expect(screen.getByText('Leave me a message')).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Comments'), { target: { value: 'Hello there!' } });

    console.log('=== User input simulated.');

    // Submit the form
    fireEvent.click(screen.getByText('Leave me a message'));

    console.log('=== Form submitted.');

    // Check if console.log was called with the correct form values
    expect(console.log).toHaveBeenCalledWith('=== form submitted: values:', JSON.stringify({
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      comments: 'Hello there!',
    }));

    // Check if success message is displayed
    expect(screen.getByText('Thank you for your message! You will be contacted shortly.')).toBeInTheDocument();
    console.log('=== Success message displayed.');
  });
});