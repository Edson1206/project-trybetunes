import { shape, string } from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favsList: [],
      isFavorite: false,
    };
  }

  async componentDidMount() {
    this.getFavsList();
  }

  handleSave = async ({ target: { checked } }) => {
    const { musicInfo } = this.props;
    this.setState({
      loading: true,
      isFavorite: checked,
    });
    if (checked) {
      await addSong(musicInfo);
    } else {
      await removeSong(musicInfo);
    }
    this.setState({
      loading: false,
    });
  };

  getFavsList = async () => {
    const { trackId } = this.props;
    const saveFavs = await getFavoriteSongs();
    this.setState({ favsList: saveFavs });
    const { favsList } = this.state;
    const foundFavSongs = favsList
      .some((songs) => songs.trackId === trackId);
    if (foundFavSongs) this.setState({ isFavorite: foundFavSongs });
  };

  render() {
    const {
      track: {
        trackName,
        previewUrl,
        trackId,
      },
    } = this.props;
    const { loading, isFavorite } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div>
        <section>
          <h3>
            {trackName}
          </h3>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>
              audio
            </code>
            .
          </audio>
          <label htmlFor="favorite">
            Favorita
            <input
              name="favorite"
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ isFavorite }
              id={ trackId }
              onChange={ this.handleSave }
            />
          </label>
        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: shape({
    trackName: string.isRequired,
    previewUrl: string.isRequired,
  }).isRequired,
  musicInfo: string.isRequired,
  trackId: string.isRequired,
};

export default MusicCard;
