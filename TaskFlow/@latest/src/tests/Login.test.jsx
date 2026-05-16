import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/Login';

const renderLogin = (contextValue = {}) => {
  const defaults = { user: null, login: vi.fn(() => ({ success: true })), register: vi.fn(() => ({ success: true })) };
  return render(
    <AuthContext.Provider value={{ ...defaults, ...contextValue }}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('Login', () => {

  it('renders the sign in heading', () => {
    renderLogin();
    expect(screen.getByText('Sign in to TaskFlow')).toBeInTheDocument();
  });

  it('renders Log In and Sign Up toggle buttons', () => {
    renderLogin();
    expect(screen.getAllByText('Log In').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Sign Up').length).toBeGreaterThanOrEqual(1);
  });

  it('shows error when submitting empty form', () => {
    renderLogin();
    fireEvent.click(screen.getAllByText('Log In')[1]);
    expect(screen.getByText('All fields are required.')).toBeInTheDocument();
  });

  it('shows password length error on sign up with short password', async () => {
    renderLogin();
    fireEvent.click(screen.getAllByText('Sign Up')[0]);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: '123' } });
    fireEvent.click(screen.getAllByText('Sign Up')[1]);
    expect(screen.getByText('Password must be at least 6 characters.')).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    renderLogin();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('renders the social auth link', () => {
    renderLogin();
    expect(screen.getByText('Continue with GitHub or Google')).toBeInTheDocument();
  });
});
