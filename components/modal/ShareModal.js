import React from 'react';
import classnames from 'classnames';
import { Autobind } from 'es-decorators';

import Icon from 'components/ui/Icon';

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      mode: 'share'
    };
  }

  onCopyClick() {
    const copyTextarea = this.input;
    copyTextarea.select();

    try {
      document.execCommand('copy');
      this.setState({ copied: true });
    } catch (err) {
      console.warn('Oops, unable to copy');
    }
  }

  getContent() {
    const { url } = this.props;
    const { mode } = this.state;
    const content = (
      <div className="url-container">
        <input ref={(n) => { this.input = n; }} value={url} className="url" readOnly />
        <button className="c-btn -primary -filled" onClick={() => this.onCopyClick()}>
          Copy
        </button>
      </div>
    );

    return (
      <div className="share-content">
        <h1 className="c-text -header-normal -thin title">
          {mode === 'share' && 'Share this page'}
          {mode === 'embed' && 'Share into my web'}
        </h1>
        {content}
        {mode === 'share' &&
          <div className="media">
            <a
              href={`http://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="icon-facebook" className="-medium" />
            </a>
            <a
              href={`https://twitter.com/share?url=${url}&text=Resource watch, explore datasets`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="icon-twitter" className="-medium" />
            </a>
          </div>
        }
      </div>
    );
  }

  @Autobind
  handleShare() {
    this.setState({
      mode: 'share'
    });
  }

  @Autobind
  handleEmbed() {
    this.setState({
      mode: 'embed'
    });
  }

  render() {
    const { mode } = this.state;

    return (
      <div className="share-modal">
        <header className="c-header -transparent">
          <div>
            <div className="header-main">
              <nav className="header-menu">
                <ul>
                  <li
                    className={classnames({ '-active': mode === 'share' })}
                    onClick={this.handleShare}
                  >
                    <a>Link</a>
                  </li>
                  <li
                    className={classnames({ '-active': mode === 'embed' })}
                    onClick={this.handleEmbed}
                  >
                    <a>Embed</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        {this.getContent()}
      </div>
    );
  }
}

ShareModal.propTypes = {
  url: React.PropTypes.string
};


export default ShareModal;
