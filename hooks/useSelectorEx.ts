import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const useSelectorEx = <TSelected = unknown> (
  selector: (state: RootState) => TSelected,
  equalityFn ?: (left: TSelected, right: TSelected) => boolean
): TSelected => useSelector<RootState, TSelected>(selector, equalityFn);