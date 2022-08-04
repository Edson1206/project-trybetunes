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
      notFound: '',
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
    }, () => {
      if (result.length === 0) {
        this.setState({
          notFound: 'Nenhum álbum foi encontrado',
        });
      }
    });
  }

  render() {
    const {
      inputArtist,
      disabled,
      loading,
      artistName,
      artistArray,
      notFound,
    } = this.state;
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
        { artistArray.length > 0
        && <h3>{`Resultado de álbuns de: ${artistName}`}</h3>}
        { artistArray.length > 0
          && artistArray.map((album) => (
            <div key={ album.collectionId }>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                <p>
                  {`${album.artistName}}
                  Album:${album.collectionName}`}
                </p>
              </Link>
            </div>
          ))}
        {!artistArray.length && <p>{notFound}</p>}
      </div>
    );
  }
}

export default Search;
