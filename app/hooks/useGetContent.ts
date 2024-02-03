import { getComments } from '@/apis/contents/getComments';
import { getContent } from '@/apis/contents/getContent';
import {
  GetContentParams,
  getCardContents,
  getMapContents,
} from '@/apis/map/getContents';
import {
  queryCardContentsKey,
  queryCommentsKey,
  queryContentKey,
  queryMapContentsKey,
} from '@/constants/queryKey';
import { useInfiniteQuery, useQuery } from 'react-query';

export const useCardContents = (data: GetContentParams) => {
  return useInfiniteQuery(
    [queryCardContentsKey, data.position, data.follow],
    () => getCardContents(data),
    {
      getNextPageParam: (lastPage, allPage) => {
        return lastPage.currentPage < lastPage.totalPages
          ? lastPage.page + 1
          : undefined;
      },
      staleTime: 1,
    },
  );
};

export const useMapContents = (data: GetContentParams) => {
  return useQuery(
    [queryMapContentsKey, data.position, data.follow],
    () => getMapContents(data),
    { staleTime: 1 },
  );
};

export const useContent = (contentId: string | null) => {
  return useQuery([queryContentKey], () => getContent(contentId), {
    staleTime: 1,
  });
};

export const useComments = (contentId: string | null) => {
  return useQuery([queryCommentsKey], () => getComments(contentId), {
    staleTime: 1,
  });
};