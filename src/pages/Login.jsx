import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: 3,
      loading: false,
      goToSearch: false,
      inputName: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  clickButton = async () => {
    const { inputName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: inputName });
    this.setState({
      goToSearch: true,
      loading: false,
    });
  }

  render() {
    const { inputName, disabled, loading, goToSearch } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (goToSearch) {
      return <Redirect to="/search" />;
    }
    return (
      <div
        data-testid="page-login"
      >
        <h1>Login</h1>
        <form>
          <input
            data-testid="login-name-input"
            placeholder="Nome"
            type="text"
            name="inputName"
            value={ inputName }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ inputName.length < disabled }
            onClick={ this.clickButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
