import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('Shipping Box App', () => {
  test('renders header and tabs', () => {
    render(<App />);
    expect(screen.getByText(/Shipping Box/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Form/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /List/i })).toBeInTheDocument();
  });

  test('shows AddboxForm by default', () => {
    render(<App />);
    expect(screen.getByText(/Add Shipping Box/i)).toBeInTheDocument();
  });

  test('switches to List tab and shows table', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /List/i }));
    expect(screen.getByText(/No boxes added yet/i)).toBeInTheDocument();
  });

  test('shows error if required fields are missing', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    expect(await screen.findByText(/All fields are required/i)).toBeInTheDocument();
  });

  test('shows error for negative weight and resets to zero', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Receiver Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Weight/i), { target: { value: -5 } });
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    expect(await screen.findByText(/Negative values are not permitted/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weight/i).value).toBe('0');
  });

  test('adds a box and shows success message', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Receiver Name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/Weight/i), { target: { value: 2 } });
    fireEvent.change(screen.getByLabelText(/Box Colour/i), { target: { value: '#ff0000' } });
    fireEvent.change(screen.getByLabelText(/Destination Country/i), { target: { value: 'China' } });
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    expect(await screen.findByText(/Box added successfully/i)).toBeInTheDocument();
  });

  test('added box appears in the list', async () => {
    render(<App />);
    // Add a box
    fireEvent.change(screen.getByLabelText(/Receiver Name/i), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByLabelText(/Weight/i), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText(/Box Colour/i), { target: { value: '#00ff00' } });
    fireEvent.change(screen.getByLabelText(/Destination Country/i), { target: { value: 'Brazil' } });
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    await waitFor(() => expect(screen.getByText(/Box added successfully/i)).toBeInTheDocument());
    // Switch to list
    fireEvent.click(screen.getByRole('button', { name: /List/i }));
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText(/INR/)).toBeInTheDocument();
  });

  test('hamburger menu appears on small screens', () => {
    // Set window width to mobile
    global.innerWidth = 500;
    render(<App />);
    expect(screen.getByLabelText(/Open menu/i)).toBeInTheDocument();
  });
});