import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      disabled: 2,
      inputArtist: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { inputArtist, disabled } = this.state;
    return (
      <>
        <Header />
        <div
          data-testid="page-search"
        >
          <form>
            <input
              data-testid="search-artist-input"
              placeholder="Nome do artista ou banda"
              type="text"
              name="inputArtist"
              value={ inputArtist }
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ inputArtist.length < disabled }
            >
              Entrar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
