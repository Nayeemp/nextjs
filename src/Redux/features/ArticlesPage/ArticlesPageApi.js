/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { apiSlice } from '../api/apiSlice';

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['ArticlesPageAllArticles'],
});
export const ArticlesPageApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    articlesPageGetTopics: builder.query({
      query: (data) => ({ url: '/blog/category/' }),
    }),

    articlesPageFilterArticles: builder.query({
      query: (selectedTopic) => {
        // console.log('selectedTopic = ', selectedTopic);
        if (selectedTopic.name === 'All') {
          return { url: '/blog/blog-list/?limit=5&offset=0' };
        }

        return {
          url: `/blog/blog-list/?limit=5&offset=0&category=${selectedTopic.id}`,
        };
      },
    }),

    articlesPageGetMoreFilterArticles: builder.query({
      query: ({ selectedTopic, limit, offset }) => {
        // console.log('selectedTopic = ', selectedTopic);
        if (selectedTopic.name === 'All') {
          return { url: `/blog/blog-list/?limit=${limit}&offset=${offset}` };
        }

        return {
          url: `/blog/blog-list/?limit=${limit}&offset=${offset}&category=${selectedTopic.id}`,
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // console.log('inside getMoreBlogListApi arg = ', arg);
          const result = await queryFulfilled;
          // console.log('inside getMoreBlogListApi  result = ', result);
          if (result?.data?.results?.length > 0) {
            // console.log('inside getMoreBlogListApi  result.data.results = ', result.data.results);

            // update blogList cache
            dispatch(
              apiSlice.util.updateQueryData(
                'articlesPageFilterArticles',
                arg.selectedTopic,
                (draftState) => {
                  // console.log('draftState = ', JSON.stringify(draftState));
                  // console.log('draftState.results = ', JSON.stringify(draftState.results));
                  draftState.results = [
                    ...draftState.results,
                    ...result.data.results,
                  ];
                }
              )
            );
          }
        } catch (error) {
          //
        }
      },
    }),

    articlesPagePopularArticles: builder.query({
      query: ({ limit, offset }) => ({
        url: `/blog/popular-blog-list/?limit=${limit}&offset=${offset}`,
      }),
    }),

    articlesPageMostLikesArticles: builder.query({
      query: ({ limit, offset }) => ({
        url: `/blog/popular-blog-list/?limit=${limit}&offset=${offset}`,
      }),
    }),
  }),
});

export const {
  useArticlesPageGetTopicsQuery,
  useArticlesPageFilterArticlesQuery,
  useArticlesPagePopularArticlesQuery,
  useArticlesPageMostLikesArticlesQuery,
} = ArticlesPageApi;
