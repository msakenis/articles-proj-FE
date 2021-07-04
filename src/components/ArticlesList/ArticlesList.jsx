import React, {useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {SingleArticleCard} from '../';
import {ArticlesListContext} from '../../contexts/ArticlesList.context';

const ArticlesList = () => {
  const {articlesList} = useContext(ArticlesListContext);

  return (
    <Grid container justify='center' spacing={3}>
      {articlesList?.length > 0 &&
        articlesList.map((item, index) => <SingleArticleCard key={`card-${index}`} index={index} item={item} />)}
      {articlesList?.length === 0 && <Typography variant={'subtitle1'}>No articles found</Typography>}
    </Grid>
  );
};

export default ArticlesList;
