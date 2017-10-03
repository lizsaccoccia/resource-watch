import React from 'react';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { bindActionCreators } from 'redux';
import { getWidget, toggleLayerGroupVisibility } from 'redactions/widget';

// Components
import Page from 'components/app/layout/Page';
import EmbedLayout from 'components/app/layout/EmbedLayout';
import Spinner from 'components/ui/Spinner';
import Map from 'components/vis/Map';
import Legend from 'components/ui/Legend';

// Utils
import LayerManager from 'utils/layers/LayerManager';

class EmbedMap extends Page {
  static getInitialProps(context) {
    const props = super.getInitialProps(context);

    const { req, isServer } = context;
    const referer = isServer ? req.headers.referer : location.href;

    return { ...props, referer, isLoading: true };
  }

  isLoadedExternally() {
    return !/localhost|staging.resourcewatch.org/.test(this.props.referer);
  }

  componentDidMount() {
    this.props.getWidget(this.props.url.query.id);
  }

  render() {
    const { widget, loading, layerGroups } = this.props;

    if (loading) {
      return (
        <EmbedLayout
          title={'Loading widget...'}
          description={''}
        >
          <Spinner isLoading={loading} className="-light" />
        </EmbedLayout>
      );
    }

    const mapConfig = { zoom: 3, latLng: { lat: 0, lng: 0 } };

    return (
      <EmbedLayout
        title={`${widget.attributes.name}`}
        description={`${widget.attributes.description || ''}`}
      >
        <div className="c-embed-widget">
          <div className="visualization">
            <div className="widget-title">
              <h4>{widget.attributes.name}</h4>
            </div>
            <div className="widget-content">
              <Map
                LayerManager={LayerManager}
                mapConfig={mapConfig}
                layerGroups={layerGroups}
              />

              <Legend
                layerGroups={layerGroups}
                className={{ color: '-dark' }}
                toggleLayerGroupVisibility={
                  layerGroup => this.props.toggleLayerGroupVisibility(layerGroup)
                }
                setLayerGroupsOrder={() => {}}
                setLayerGroupActiveLayer={() => {}}
                interactionDisabled
                expanded={false}
              />
            </div>
            <p className="widget-description">
              {widget.attributes.description}
            </p>
          </div>
          { this.isLoadedExternally() &&
            <img
              className="embed-logo"
              height={21}
              width={129}
              src={'/static/images/logo-embed.png'}
              alt="Resource Watch"
            /> }
        </div>
      </EmbedLayout>
    );
  }
}

EmbedMap.propTypes = {
  widget: PropTypes.object,
  isLoading: PropTypes.bool,
  getWidget: PropTypes.func,
  toggleLayerGroupVisibility: PropTypes.func,
  loading: PropTypes.bool,
  layerGroups: PropTypes.array
};

EmbedMap.defaultProps = {
  widget: {}
};

const mapStateToProps = state => ({
  widget: state.widget.data,
  loading: state.widget.loading,
  layerGroups: state.widget.layerGroups
});

const mapDispatchToProps = dispatch => ({
  getWidget: bindActionCreators(getWidget, dispatch),
  toggleLayerGroupVisibility: bindActionCreators(toggleLayerGroupVisibility, dispatch)
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(EmbedMap);
