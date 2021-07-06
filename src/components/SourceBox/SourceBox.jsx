import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';

import * as S from './SourceBox.module.scss';

const SourceBox = ({item}) => {
  const convertTimeToHumanReadable = ({isoString}) => {
    const relativePublishedAt = moment(isoString).fromNow();
    const formattedPublishedAt = moment(isoString).format('YYYY-MM-DD HH:mm');

    return {relativePublishedAt, formattedPublishedAt};
  };
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={`${S.sourceBox} ${S.flex}`}>
      <Link className={`${S.sourceLink} ${S.flex}`} onClick={() => window.open(item.source.url, '_blank')}>
        <ListItemIcon className={S.iconWrapper}>
          <GetAppIcon className={`${S.icon} ${isXsDown && S.mobileIcon}`} />
        </ListItemIcon>
        <Typography variant={isXsDown ? 'body2' : 'caption'} color={'textSecondary'}>
          {item.source.name}
        </Typography>
      </Link>

      <Tooltip title={convertTimeToHumanReadable({isoString: item.publishedAt}).formattedPublishedAt}>
        <div className={S.flex}>
          <ListItemIcon className={S.iconWrapper}>
            <AccessTimeIcon className={`${S.icon} ${isXsDown && S.mobileIcon}`} />
          </ListItemIcon>

          <Typography variant={isXsDown ? 'body2' : 'caption'} color={'textSecondary'}>
            {convertTimeToHumanReadable({isoString: item.publishedAt}).relativePublishedAt}
          </Typography>
        </div>
      </Tooltip>
    </div>
  );
};

SourceBox.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SourceBox;
