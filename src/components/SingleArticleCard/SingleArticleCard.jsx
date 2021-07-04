import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import * as S from './SingleArticleCard.module.scss';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import {SourceBox} from '../';

const SingleArticleCard = ({index, item}) => {
  const truncate = ({str, n}) => (str.length > n ? str.substr(0, n - 1) + '...' : str);
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Fade in timeout={Math.min((index + 1) * 200, 2000)} key={index}>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Card className={S.card}>
          <CardMedia className={S.media} image={item.image} title={item.title} />
          <CardContent className={S.cardContent}>
            <Typography variant={'h6'} component='h2'>
              {item.title}
            </Typography>

            <SourceBox item={item} />

            <Typography variant={isXsDown ? 'body1' : 'body2'} color='textSecondary' component='p'>
              {truncate({str: item.description, n: 210})}
            </Typography>
          </CardContent>
          <CardActions className={`${S.buttonDiv} ${isXsDown && S.mobileButtonDiv}`}>
            <Button
              className={isXsDown && S.button}
              size={isXsDown ? 'medium' : 'small'}
              color='primary'
              onClick={() => window.open(item.url, '_blank')}>
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
