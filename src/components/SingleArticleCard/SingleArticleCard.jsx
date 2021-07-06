import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';

import {SourceBox, LazyLoadCardMedia} from '../';
import {ArticlesListContext} from '../../contexts/ArticlesList.context';
import {logUserActionTypes} from '../../utils/actions';
import * as S from './SingleArticleCard.module.scss';

const SingleArticleCard = ({index, item}) => {
  const truncate = ({str, n}) => (str.length > n ? str.substr(0, n - 1) + '...' : str);
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const {logUserActions} = useContext(ArticlesListContext);
  return (
    <Fade in timeout={Math.min((index + 1) * 200, 2000)} key={index}>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Card className={S.card}>
          <LazyLoadCardMedia image={item.image} title={item.title} />
          <CardContent className={S.cardContent}>
            <Typography variant={'h6'} component='h2'>
              {item.title}
            </Typography>

            <SourceBox item={item} />

            <Typography variant={isXsDown ? 'body1' : 'body2'} color='textSecondary' component='p'>
              {truncate({str: item.description, n: 210})}
            </Typography>
          </CardContent>
          {isXsDown && <Divider />}
          <CardActions className={`${S.buttonDiv} ${isXsDown && S.mobileButtonDiv}`}>
            <Button
              className={isXsDown ? S.button : null}
              size={isXsDown ? 'medium' : 'small'}
              color='primary'
              onClick={() => {
                window.open(item.url, '_blank');
                logUserActions({payload: {article: item, action: logUserActionTypes.ARTICLE_CLICK}});
              }}>
              Read More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Fade>
  );
};

SingleArticleCard.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

export default SingleArticleCard;
