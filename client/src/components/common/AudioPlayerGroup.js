import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactAudioPlayer from 'react-audio-player'

const AudioPlayerGroup = ({ url, error, onChange, name }) => {
  return (
    <div>
      <ReactAudioPlayer src={url} controls />
      <input
        type="file"
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        onChange={onChange}
        accept="audio/*"
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

AudioPlayerGroup.PropTypes = {
  url: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default AudioPlayerGroup
