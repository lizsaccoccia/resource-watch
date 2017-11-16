import React from 'react';
import PropTypes from 'prop-types';
import { Autobind } from 'es-decorators';
import classnames from 'classnames';

// Components
import Icon from 'components/ui/Icon';


class ToggleSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: props.open || false };
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      const addSearchConfigScript = document.createElement('script');
      addSearchConfigScript.innerHTML = 'window.addsearch_settings = { display_url: true, display_category: false, display_resultscount: true }';

      const addSearchLibScript = document.createElement('script');
      addSearchLibScript.src = `https://addsearch.com/js/?key=${process.env.ADD_SEARCH_KEY}`;
      addSearchLibScript.async = true;

      document.body.appendChild(addSearchConfigScript);
      document.body.appendChild(addSearchLibScript);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState && this.state.open !== nextState.open) return true;
    return false;
  }

  onUserFocus() {
    this.setState({ open: true });
  }

  onUserBlur() {
    this.setState({ open: false });
  }

  @Autobind
  handleSearchClick() {
    this.setState({ open: true });
  }

  render() {
    const { open } = this.state;
    const classNames = classnames({
      '-open': open
    });
    return (
      <form className={`toggle-search ${classNames}`}>
        <div className="c-field-search">
          <div
            onClick={this.handleSearchClick}
            role="button"
            tabIndex={-1}
          >
            <Icon name="icon-search" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="addsearch"
            onFocus={() => this.onUserFocus()}
            onBlur={() => this.onUserBlur()}
          />
        </div>
      </form>
    );
  }
}

ToggleSearch.defaultProps = {
  open: false
};

ToggleSearch.propTypes = {
  open: PropTypes.bool
};

export default ToggleSearch;
