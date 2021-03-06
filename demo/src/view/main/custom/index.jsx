import React from 'react';
import PropTypes from 'prop-types';
import Html5Player from 'html5-player';

import Custom from './custom';

export default class View extends React.Component {
  static contextTypes = {
    player: PropTypes.object,
  };
  state = {};
  render() {
    return (
      <div className="demo-container">
        <div className="player-container">
          <h3>
            自定义摄像机方向控制（通过播放器上面盖一层做处理，播放后，移上去就知道了。）
          </h3>
          <Html5Player
            controls={{ playPause: false }}
            file="https://wowzaec2demo.streamlock.net/live/bigbuckbunny/playlist.m3u8"
          >
            <Custom />
          </Html5Player>
        </div>
      </div>
    );
  }
}
