import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as S from './Pagination.module.scss';

const Pagination = ({currentPage, isLastPage, onChange, isLoading}) => {
  const [page, setPage] = useState(parseInt(currentPage));

  useEffect(() => {
    setPage(parseInt(currentPage));
  }, [currentPage]);

  const handleClick = (newPageValue) => {
    setPage(newPageValue);
    onChange(newPageValue);
  };

  return (
    <div className={S.wrapper}>
      <div>
        <IconButton disabled={page === 1 || isLoading} onClick={() => handleClick(page - 1)}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton disabled={isLastPage || isLoading} onClick={() => handleClick(page + 1)}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default Pagination;
