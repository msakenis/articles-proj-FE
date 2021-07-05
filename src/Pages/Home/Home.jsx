import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import * as S from './Home.module.scss';
import {ArticlesListContext} from '../../contexts/ArticlesList.context';
import {SearchInput, Notification, ArticlesList, Loading, Pagination} from '../../components';
import {logUserActionTypes} from '../../utils/actions';

const Home = () => {
  const {isLoading, articlesList, setUrl, page, totalArticles, query, logUserActions} = useContext(ArticlesListContext);

  return (
    <Container>
      <Notification />
      <SearchInput
        onRequestSearch={(value) => {
          setUrl({query: value, page: 1});
          logUserActions({payload: {searchKeyword: value, action: logUserActionTypes.SEARCH_SUBMIT}});
        }}
        onCancelSearch={() => setUrl({page: 1})}
      />
      <Typography variant={'h4'} component={'h1'} color={'textSecondary'} className={S.title}>
        Articles
      </Typography>
      {isLoading || !articlesList ? (
        <div className={S.center}>
          <Loading />
        </div>
      ) : (
        <ArticlesList />
      )}
      <Pagination
        currentPage={page}
        isLastPage={Math.ceil(totalArticles / 9) === page}
        isLoading={isLoading}
        onChange={(newPageValue) => setUrl({query, page: newPageValue})}
      />
    </Container>
  );
};

export default Home;
