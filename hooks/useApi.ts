import get from '@/api/get';
import post from '@/api/post';
import { decrementCalling, incrementCalling } from '@/store/apiSlice';
import { useDispatch } from 'react-redux';

export const useGetApi = () => {
  const dispatch = useDispatch();
  return async <T = any>(endpoint: string, queries?: Record<string, any>, token?: any) => {
    dispatch(incrementCalling());
    const res = await get<T>(endpoint, queries, token);
    dispatch(decrementCalling());
    return res;
  };
};

export const usePostApi = () => {
  const dispatch = useDispatch();
  return async <T = any>(endpoint: string, body?: Record<string, any>, token?: any) => {
    dispatch(incrementCalling());
    const res = await post<T>(endpoint, body, token);
    dispatch(decrementCalling());
    return res;
  };
};