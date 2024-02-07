import {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form'
import axios from 'axios';

function SignIn() {
  const { handleSubmit, register } = useForm();

  const [error, toggleError] = useState(false);
  const { login } = useContext(AuthContext);

  const source = axios.CancelToken.source();

  // mocht onze pagina ge-unmount worden voor we klaar zijn met data ophalen, aborten we het request
  useEffect(() => {
    return function cleanup() {
      source.cancel();
    }
  }, []);

  async function onSubmit(data) {
    toggleError(false);

    try {
      const result = await axios.post('http://localhost:3000/login', {
        email: data.email,
        password: data.password
      },{
        cancelToken: source.token,
      });
      // log het resultaat in de console
      console.log(result.data);

      // geef de JWT token aan de login-functie van de context mee
      login(result.data.accessToken);

    } catch(e) {
      console.error(e);
      toggleError(true);
    }
  }

  return (
      <>
        <h1>Inloggen</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email-field">
            Emailadres:
            <input
                type="email"
                id="email-field"
                {...register("email")}
            />
          </label>

          <label htmlFor="password-field">
            Wachtwoord:
            <input
                type="password"
                id="password-field"
                {...register("password")}
            />
          </label>
          {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}

          <button
              type="submit"
              className="form-button"
          >
            Inloggen
          </button>
        </form>

        <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
      </>
  );
}

export default SignIn;