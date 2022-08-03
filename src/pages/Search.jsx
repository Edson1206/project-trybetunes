import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../Components/Header';
import Loading from '../Components/Loading';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: 2,
      inputArtist: '',
      loading: false,
      artistName: '',
      artistArray: [],
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  clickSearch = async () => {
    const { inputArtist } = this.state;
    this.setState({
      loading: true,
    });
    const result = await searchAlbumsAPI(inputArtist);
    this.setState({
      loading: false,
      inputArtist: '',
      artistName: inputArtist,
      artistArray: result,
    });
  }

  render() {
    const { inputArtist, disabled, loading, artistName, artistArray } = this.state;
    return (
      <div
        data-testid="page-search"
      >
        <Header />
        { loading && <Loading />}
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
            onClick={ this.clickSearch }
          >
            Pesquisar
          </button>
        </form>
        <section>
          <h3>
            {`Resultado de álbuns de: ${artistName}`}
          </h3>
          <div>
            {artistArray.map((album) => (
              <Link
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                <p>
                  {`${album.artistName}}
                  Album:${album.collectionName}`}
                </p>
              </Link>
            ))}
          </div>
          {artistArray.length === 0 && <p>Nenhum álbum foi encontrado</p>}
        </section>
      </div>
    );
  }
}

export default Search;
