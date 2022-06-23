import {gql, useMutation, useLazyQuery, useQuery} from '@apollo/client';

const VIEW_POST_PAGINATION = gql`
  query Query($limit: Int, $cursor: InputPostCursor) {
    posts(limit: $limit, cursor: $cursor) {
      edges {
        node {
          id
          caption
          age
          commentsCount
          reactions {
            reactionsCount
          }
          album {
            url
            formats {
              thumbnail {
                mime
                ext
                name
                width
                height
                url
                size
                __typename
              }
              medium {
                name
                mime
                ext
                width
                height
                size
                url
                __typename
              }
              small {
                name
                mime
                ext
                width
                height
                size
                url
                __typename
              }
              __typename
            }
            __typename
          }
          owner {
            id
            fullname
            avatar {
              id
              url
              formats {
                thumbnail {
                  url
                  __typename
                }
                __typename
              }
              __typename
            }
            sports {
              sportstyle {
                key
                displayname
                __typename
              }
              sporttype {
                displayname
                key
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      postPageInfo {
        threshold
        cursorPrevious {
          opts {
            value
            type
          }
          value
          direction
        }
        cursorNext {
          direction
          value
          opts {
            value
            type
          }
        }
      }
    }
  }
`;

//  pagination check.
export const usePostQuery = () => {
  // return useQuery(VIEW_POST_PAGINATION);
  const getPaginatedPost = useQuery(VIEW_POST_PAGINATION, {
    variables: {
      limit: 10,
      cursor: {
        direction: 'next',
        value: null,
        opts: {
          value: 'all',
          type: 'owner',
        },
      },
    },
  });

  return getPaginatedPost;
};
