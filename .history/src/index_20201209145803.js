import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer as Basemap } from 'react-leaflet';
import carto from 'carto.js';
import Layer from './components/Layer';
import Histogram from './components/Histogram';
import timecities from './data/timecities';
import utils from './utils/index';
import './index.css';

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

  renderHistogram = () => (
    <Histogram
      client={this.cartoClient}
      source={timecities.source}
      nativeMap={this.state.nativeMap}
      onDataChanged={this.onHistogramChanged.bind(this)}
    />
  )

  // The widget returns an histogram, so we update the layer asigning a color to each histogram bin
  onHistogramChanged(data) {
    const newStyle = utils.buildStyle(data);
    this.setState({ layerStyle: newStyle, hidelayers: false })
  }
  onCheck(e) {
    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    const { center, nativeMap, zoom } = this.state;

    return (
      <div>
        <label className="switch">
          <input
            type="checkbox"
            onClick={this.onCheck.bind(this)}
            checked={this.state.checked} 
          />
          {/* <span className="slider" /> */}
        </label>
      </div>
      <main>
        <Map center={center} zoom={zoom} ref={node => { this.nativeMap = node && node.leafletElement }}>
          <Basemap attribution="" url={CARTO_BASEMAP} />

          <Layer
            source={timecities.source}
            style={this.state.layerStyle}
            client={this.cartoClient}
            hidden={this.state.hidelayers}
          />
        </Map>

        {nativeMap && this.renderHistogram()}
      </main>
    );
  }


}

render(<App />, document.getElementById('root'));
