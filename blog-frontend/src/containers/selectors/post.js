import { createSelector } from 'reselect';

const selectPostState = (state) => state.post;
const selectLoadingState = (state) => state.loading;

export const selectPost = createSelector(
  [selectPostState],
  (postState) => postState.post,
);

export const selectError = createSelector(
  [selectPostState],
  (postState) => postState.error,
);

export const selectLoading = createSelector(
  [selectLoadingState],
  (loadingState) => loadingState['post/READ_POST'],
);
