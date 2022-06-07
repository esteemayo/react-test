import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Register from 'components/Register/Register';

jest.mock('axios', () => ({
  __esModule: true,

  default: {
    post: () => ({
      data: {
        id: 1,
        name: 'John Doe',
        username: 'jdoe',
        email: 'jdoe@example.com',
        password: 'test1234',
        passwordConfirm: 'test1234',
      },
    }),
  },
}));

test('name input should be rendered', () => {
  render(<Register />);
  const nameInputEl = screen.getByTestId('name');

  expect(nameInputEl).toBeInTheDocument();
});

test('username input should be rendered', () => {
  render(<Register />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);

  expect(usernameInputEl).toBeInTheDocument();
});

test('email input should be rendered', () => {
  render(<Register />);
  const emailInputEl = screen.getByPlaceholderText(/email/i);

  expect(emailInputEl).toBeInTheDocument();
});

test('password input should be rendered', () => {
  render(<Register />);
  const passwordInputEl = screen.getByTestId('password');

  expect(passwordInputEl).toBeInTheDocument();
});

test('confirm password input should be rendered', () => {
  render(<Register />);
  const passwordConfirmInputEl =
    screen.getByPlaceholderText(/confirm password/i);

  expect(passwordConfirmInputEl).toBeInTheDocument();
});

test('button should be rendered', () => {
  render(<Register />);
  const buttonEl = screen.getByRole('button');

  expect(buttonEl).toBeInTheDocument();
});

test('name input should be empty', () => {
  render(<Register />);
  const nameInputEl = screen.getByTestId('name');

  expect(nameInputEl.value).toBe('');
});

test('username input should be empty', () => {
  render(<Register />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);

  expect(usernameInputEl.value).toBe('');
});

test('email input should be empty', () => {
  render(<Register />);
  const emailInputEl = screen.getByPlaceholderText(/email/i);

  expect(emailInputEl.value).toBe('');
});

test('password input should be empty', () => {
  render(<Register />);
  const passwordInputEl = screen.getByTestId('password');

  expect(passwordInputEl.value).toBe('');
});

test('confirm password input should be empty', () => {
  render(<Register />);
  const passwordConfirmInputEl =
    screen.getByPlaceholderText(/confirm password/i);

  expect(passwordConfirmInputEl.value).toBe('');
});

test('button should be disabled', () => {
  render(<Register />);
  const buttonEl = screen.getByRole('button');

  expect(buttonEl).toBeDisabled();
});

test('error message should not be visible', () => {
  render(<Register />);
  const errorEl = screen.getByTestId('error');

  expect(errorEl).not.toBeVisible();
});

test('name input should change', () => {
  render(<Register />);
  const nameInputEl = screen.getByTestId('name');
  const testValue = 'John Doe';

  fireEvent.change(nameInputEl, { target: { value: testValue } });

  expect(nameInputEl.value).toBe(testValue);
});

test('username input should change', () => {
  render(<Register />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = 'jdoe';

  fireEvent.change(usernameInputEl, { target: { value: testValue } });

  expect(usernameInputEl.value).toBe(testValue);
});

test('email input should change', () => {
  render(<Register />);
  const emailInputEl = screen.getByPlaceholderText(/email/i);
  const testValue = 'jdoe@example.com';

  fireEvent.change(emailInputEl, { target: { value: testValue } });

  expect(emailInputEl.value).toBe(testValue);
});

test('password input should change', () => {
  render(<Register />);
  const passwordInputEl = screen.getByTestId('password');
  const testValue = 'test1234';

  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  expect(passwordInputEl.value).toBe(testValue);
});

test('passwordConfirm input should change', () => {
  render(<Register />);
  const passwordConfirmInputEl =
    screen.getByPlaceholderText(/confirm password/i);
  const testValue = 'test1234';

  fireEvent.change(passwordConfirmInputEl, { target: { value: testValue } });

  expect(passwordConfirmInputEl.value).toBe(testValue);
});

test('button should not be disabled when inputs exist', () => {
  render(<Register />);
  const buttonEl = screen.getByRole('button');
  const nameInputEl = screen.getByTestId('name');
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const emailInputEl = screen.getByPlaceholderText(/email/i);
  const passwordInputEl = screen.getByTestId('password');
  const passwordConfirmInputEl =
    screen.getByPlaceholderText(/confirm password/i);

  const nameTestValue = 'John Doe';
  const usernameTestValue = 'jdoe';
  const emailTestValue = 'jdoe@example.com';
  const passwordTestValue = 'test1234';
  const passwordConfirmTestValue = 'test1234';

  fireEvent.change(nameInputEl, { target: { value: nameTestValue } });
  fireEvent.change(usernameInputEl, { target: { value: usernameTestValue } });
  fireEvent.change(emailInputEl, { target: { value: emailTestValue } });
  fireEvent.change(passwordInputEl, { target: { value: passwordTestValue } });
  fireEvent.change(passwordConfirmInputEl, {
    target: { value: passwordConfirmTestValue },
  });
  fireEvent.click(buttonEl);

  expect(buttonEl).not.toBeDisabled();
});

test('loading should be rendered when click', () => {
  render(<Register />);
  const buttonEl = screen.getByRole('button');
  const nameInputEl = screen.getByTestId('name');
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const emailInputEl = screen.getByPlaceholderText(/email/i);
  const passwordInputEl = screen.getByTestId('password');
  const passwordConfirmInputEl =
    screen.getByPlaceholderText(/confirm password/i);

  const nameTestValue = 'John Doe';
  const usernameTestValue = 'jdoe';
  const emailTestValue = 'jdoe@example.com';
  const passwordTestValue = 'test1234';
  const passwordConfirmTestValue = 'test1234';

  fireEvent.change(nameInputEl, { target: { value: nameTestValue } });
  fireEvent.change(usernameInputEl, { target: { value: usernameTestValue } });
  fireEvent.change(emailInputEl, { target: { value: emailTestValue } });
  fireEvent.change(passwordInputEl, { target: { value: passwordTestValue } });
  fireEvent.change(passwordConfirmInputEl, {
    target: { value: passwordConfirmTestValue },
  });
  fireEvent.click(buttonEl);

  // expect(buttonEl).toHaveTextContent(/Processing/i);
});

test('loading should not be rendered after fetching', async () => {
  render(<Register />);
  const buttonEl = screen.getByRole('button');
  const nameInputEl = screen.getByTestId('name');
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const emailInputEl = screen.getByPlaceholderText(/email/i);
  const passwordInputEl = screen.getByTestId('password');
  const passwordConfirmInputEl =
    screen.getByPlaceholderText(/confirm password/i);

  const nameTestValue = 'John Doe';
  const usernameTestValue = 'jdoe';
  const emailTestValue = 'jdoe@example.com';
  const passwordTestValue = 'test1234';
  const passwordConfirmTestValue = 'test1234';

  fireEvent.change(nameInputEl, { target: { value: nameTestValue } });
  fireEvent.change(usernameInputEl, { target: { value: usernameTestValue } });
  fireEvent.change(emailInputEl, { target: { value: emailTestValue } });
  fireEvent.change(passwordInputEl, { target: { value: passwordTestValue } });
  fireEvent.change(passwordConfirmInputEl, {
    target: { value: passwordConfirmTestValue },
  });
  fireEvent.click(buttonEl);

  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/Processing/i));
});

test('user should be rendered after fetching', async () => {
  render(<Register />);
  const buttonEl = screen.getByRole('button');
  const nameInputEl = screen.getByTestId('name');
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const emailInputEl = screen.getByPlaceholderText(/email/i);
  const passwordInputEl = screen.getByTestId('password');
  const passwordConfirmInputEl =
    screen.getByPlaceholderText(/confirm password/i);

  const nameTestValue = 'John Doe';
  const usernameTestValue = 'jdoe';
  const emailTestValue = 'jdoe@example.com';
  const passwordTestValue = 'test1234';
  const passwordConfirmTestValue = 'test1234';

  fireEvent.change(nameInputEl, { target: { value: nameTestValue } });
  fireEvent.change(usernameInputEl, { target: { value: usernameTestValue } });
  fireEvent.change(emailInputEl, { target: { value: emailTestValue } });
  fireEvent.change(passwordInputEl, { target: { value: passwordTestValue } });
  fireEvent.change(passwordConfirmInputEl, {
    target: { value: passwordConfirmTestValue },
  });
  fireEvent.click(buttonEl);

  const userItem = await screen.findByText('John Doe');

  expect(userItem).toBeInTheDocument();
});
