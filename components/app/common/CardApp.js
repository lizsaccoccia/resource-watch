import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// Components
import Title from 'components/ui/Title';

function CardApp(props) {
  const {
    background, title, description, link, className, buttonType
  } = props;

  const classNames = classnames({
    [className]: className
  });

  const buttonClasses = classnames({
    '-secondary': !buttonType,
    '-primary': buttonType && buttonType === 'primary'
  });

  return (
    <div
      className={`c-card-app ${classNames}`}
    >
      {!!background &&
        <div
          className="card-background"
          style={{
            backgroundImage: `url(${background})`
          }}
        />
      }

      <div className="card-container">
        <Title className="-default">
          {title}
        </Title>

        <div className="card-content">
          {description}
        </div>

        <div className="card-footer">
          {!!link && link.external &&
            <a
              href={link.route}
              target="_blank"
              className={`c-button ${buttonClasses} -fullwidth`}
            >
              {link.label}
            </a>
          }
        </div>
      </div>
    </div>
  );
}

CardApp.propTypes = {
  background: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.object,
  buttonType: PropTypes.string,
  className: PropTypes.any
};

CardApp.defaultProps = {
  children: ''
};

export default CardApp;
