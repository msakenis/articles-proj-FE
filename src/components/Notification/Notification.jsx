import React, {useContext} from 'react';

import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

import {ArticlesListContext} from '../../contexts/ArticlesList.context';
import * as S from './Notification.module.scss';

const Notification = () => {
  const {isError, message, closeError} = useContext(ArticlesListContext);
  return (
    <div>
      <Collapse in={isError}>
        <Alert severity={'error'} onClose={() => closeError()} className={S.spacing}>
          {message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default Notification;
