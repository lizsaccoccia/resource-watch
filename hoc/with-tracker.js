import React from 'react';
import PropTypes from 'prop-types';

// Libraries
let GA;
if (typeof window !== 'undefined') {
  /* eslint-disable global-require */
  GA = require('react-ga');
  /* eslint-enable global-require */
  GA.initialize(`${process.env.GA_ACCOUNT}`);
}


const withTracker = (Page) => {
  const trackPage = () => {
    const page = window.location.origin + window.location.pathname + window.location.search;

    GA.set({ page });
    GA.pageview(page);
  };

  const HOC = class extends React.Component {
    static async getInitialProps(context) {
      let props;
      if (typeof Page.getInitialProps === 'function') {
        props = await Page.getInitialProps(context);
      }

      return { ...props };
    }

    componentDidMount() {
      trackPage();
    }

    componentWillReceiveProps(nextProps) {
      const { url: currentUrl } = this.props;
      const { url: nextUrl } = nextProps;

      if (currentUrl.asPath !== nextUrl.asPath) {
        trackPage();
      }
    }

    render() {
      return <Page {...this.props} />;
    }
  };

  HOC.propTypes = {
    url: PropTypes.object
  };

  return HOC;
};


export default withTracker;
