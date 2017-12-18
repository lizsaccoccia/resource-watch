import React from 'react';
import PropTypes from 'prop-types';

// Components
import DatasetList from 'components/app/explore/DatasetList';
import Spinner from 'components/ui/Spinner';

export default function SimilarDatasets({ data }) {
  return (
    <div className="c-similar-datasets">
      {data.loading &&
        <Spinner
          isLoading
          className="-relative -light"
        />
      }
      {data.list && data.list.length > 0 &&
        <DatasetList
          active={[]}
          list={data.list}
          mode="grid"
          showFavorite
          showActions={false}
          // onTagSelected={this.handleTagSelected}
        />
      }
    </div>
  );
}

SimilarDatasets.propTypes = {
  data: PropTypes.object
};

SimilarDatasets.defaultProps = {
  data: {}
};
