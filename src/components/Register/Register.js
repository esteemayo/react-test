import axios from 'axios';
import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
};

const Register = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);

  const { name, email, username, password, passwordConfirm } = values;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        'http://jsonplaceholder.typicode.com/users',
        { ...values }
      );
      setUser(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className='container'>
      <span className='user'>{user?.name}</span>
      <form>
        <input
          type='text'
          name='name'
          placeholder='Name'
          data-testid='name'
          value={name}
          onChange={handleChange}
        />
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={username}
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          data-testid='password'
          value={password}
          onChange={handleChange}
        />
        <input
          type='password'
          name='passwordConfirm'
          placeholder='Confirm Password'
          value={passwordConfirm}
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          disabled={
            !name || !email || !username || !password || !passwordConfirm
              ? true
              : false
          }
        >
          {loading ? 'Processing' : 'Register'}
        </button>
        <span
          data-testid='error'
          style={{ visibility: error ? 'visible' : 'hidden' }}
        >
          Something went wrong!
        </span>
      </form>
    </div>
  );
};

export default Register;
