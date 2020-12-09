import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer as Basemap } from 'react-leaflet';
import carto from 'carto.js';
import Layer from './components/Layer';
import timecities from './data/timecities';
// import utils from './utils/index';
import './index.css';
// import Switch from '@material-ui/core/Switch';
import Switch from './components/Switch'
// import { Button } from '@material-ui/core'

const CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png';

class App extends Component {
  state = {
    center: [8, -1.5],
    zoom: 6,
    nativeMap: undefined,
    layerStyle: timecities.style,
    hidelayers: false
  }

  cartoClient = new carto.Client({ apiKey: '63a34c7e7a1f2afd81933cea151620c53ec9c61b', username: 'karastuart' });

  componentDidMount() {
    this.setState({ nativeMap: this.nativeMap });
  }

  onCheck(e) {
    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    const { center, nativeMap, zoom } = this.state;

    return (
      

      <main>
        <div>
          {/* <Switch /> */}
          <Button color="primary">Hello World</Button>;
          <label className="switch">
            <input
              type="checkbox"
              onClick={this.onCheck.bind(this)}
              checked={this.state.checked} 
            />
            {/* <span className="slider" /> */}
          </label>
        </div>
        <Map center={center} zoom={zoom} ref={node => { this.nativeMap = node && node.leafletElement }}>
          <Basemap attribution="" url={CARTO_BASEMAP} />
          {this.state.checked ? (
            <Layer
              source={timecities.source}
              style={this.state.layerStyle}
              client={this.cartoClient}
              hidden={this.state.hidelayers}
            />
          ) : null}
        </Map>
      </main>
    );
  }


}

render(<App />, document.getElementById('root'));
