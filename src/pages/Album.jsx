import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumInfo: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.loadAlbum();
  }

  loadAlbum = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const albumResult = await getMusics(id);
    this.setState({
      albumInfo: albumResult,
      loading: false,
    });
  }

  render() {
    const { loading, albumInfo } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div data-testid="page-album">
        <Header />

        <div>
          <section data-testid="album-name">
            <img src={ albumInfo[0].artworkUrl100 } alt={ albumInfo[0].artistName } />
            <h2>{ albumInfo[0].collectionName }</h2>
            <h3 data-testid="artist-name">{ albumInfo[0].artistName }</h3>
          </section>
        </div>

        <div>
          {albumInfo.map((music, index) => {
            if (index > 0) {
              return <MusicCard key={ music.trackId } track={ music } />;
            }
            return null;
          })}
        </div>

      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
