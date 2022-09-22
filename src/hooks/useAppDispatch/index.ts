import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../reducers';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
