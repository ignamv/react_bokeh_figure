import React from 'react';
import {Bokeh, bokehLoaded} from './BokehLoader';

const debug = console.log;

export default class BokehFigure extends React.Component {
  insertfigure(container) {
    const figure = new Bokeh.Plotting.figure({
      plot_width: this.props.width,
      plot_height: this.props.height,
      ...this.props.options
    });
    this.props.renderer(figure, Bokeh);
    const col = new Bokeh.Column({
      children: [figure],
      sizing_mode: 'scale_width'
    });
    Bokeh.Plotting.show(col, container);
  }

  render() {
    const style = {
      width: this.props.width,
      height: this.props.height
    };
    return React.createElement('div', {
      style: style,
      ref: el => bokehLoaded.then(()=>this.insertfigure(el)),
      className: 'BokehFigure'
    }, null);
  }
}
