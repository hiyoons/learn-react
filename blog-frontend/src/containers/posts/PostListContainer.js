import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { listPosts } from '../../modules/posts';
import PostList from '../../components/posts/PostList';
const PostListContainer = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
    shallowEqual,
  );
  useEffect(() => {
    const tag = searchParams.get('tag');
    // page가 없으면 1을 기본값으로 사용
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const username = searchParams.get('username');

    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, searchParams]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
