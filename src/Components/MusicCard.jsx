import { shape, string } from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const {
      track: {
        trackName,
        previewUrl,
      },
    } = this.props;

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
};

export default MusicCard;
