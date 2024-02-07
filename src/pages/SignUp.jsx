import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios';

function SignUp() {
  // hookform voor het formulier
  const { handleSubmit, register } = useForm();

  // state voor functionaliteit
  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);

  const navigate = useNavigate();

  // we maken een canceltoken aan voor ons netwerk-request
  const source = axios.CancelToken.source();

  // mocht onze pagina ge-unmount worden voor we klaar zijn met data ophalen, aborten we het request
  useEffect(() => {
    return function cleanup() {
      source.cancel();
    }
  }, []);

  async function onSubmit(data) {
    console.log(data)
    toggleError(false);
    toggleLoading(true);

    try {
      await axios.post('http://localhost:3000/register', {
        email: data.email,
        username: data.username,
        password: data.password
      },{
        cancelToken: source.token,
      });

      // als alles goed gegaan is, linken we door naar de login-pagina
      navigate('/signin');
    } catch(e) {
      console.error(e);
      toggleError(true);
    }

    toggleLoading(false);
  }

  return (
      <>
        <h1>Registreren</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
          harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
          doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email-field">
            Emailadres:
            <input
                type="email"
                id="email-field"
                {...register("email")}
            />
          </label>

          <label htmlFor="username-field">
            Gebruikersnaam:
            <input
                type="text"
                id="username-field"
                {...register("username")}
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
          {error && <p className="error">Dit account bestaat al. Probeer een ander emailadres.</p>}
          <button
              type="submit"
              className="form-button"
              disabled={loading}
          >
            Registreren
          </button>

        </form>

        <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
      </>
  );
}

export default SignUp;