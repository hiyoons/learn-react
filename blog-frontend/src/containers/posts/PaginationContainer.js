import React, { useMemo } from 'react';
import Pagination from '../../components/posts/Pagination';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const PaginationContainer = () => {
  const [searchParams] = useSearchParams();
  const username = useMemo(() => searchParams.get('username'), [searchParams]);
  const tag = useMemo(() => searchParams.get('tag'), [searchParams]);
  const page = useMemo(
    () => parseInt(searchParams.get('page'), 10) || 1,
    [searchParams],
  );
  // const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
  //   lastPage: posts.lastPage,
  //   posts: posts.posts,
  //   loading: loading['posts/LIST_POSTS'],
  // }));
  const selectPostState = (state) => state.posts;
  const selectLoadingState = (state) => state.loading;

  const selectPaginationData = createSelector(
    [selectPostState, selectLoadingState],
    (posts, loading) => ({
      lastPage: posts.lastPage,
      posts: posts.posts,
      loading: loading['posts/LIST_POSTS'],
    }),
  );
  const { lastPage, posts, loading } = useSelector(selectPaginationData);
  if (!posts || loading) return null;

  return (
    <Pagination
      tag={tag}
      username={username}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default PaginationContainer;
