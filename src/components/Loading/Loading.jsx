import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as S from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={S.center}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
