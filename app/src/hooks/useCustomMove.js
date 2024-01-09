import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const getNum = (value, defaultValue) => {
  if (!value) return defaultValue;
  return value;
};

const useCustomMove = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultPage = getNum(searchParams.get('page'), 1);
  const defaultSize = getNum(searchParams.get('size'), 10);
  const defaultSearch = createSearchParams({
    page: defaultPage,
    size: defaultSize,
  }).toString();
  const moveToList = (params) => {
    let search = '';
    if (params) {
      const page = getNum(params.page, 1);
      const size = getNum(params.size, 10);
      search = createSearchParams({
        page,
        size,
      }).toString();
    } else {
      search = defaultSearch;
    }
    navigate({
      pathname: '../list',
      search,
    });
  };
  const moveToModify = (tno) => {
    console.log(defaultSearch);
    navigate({
      pathname: `../modify/${tno}`,
      search: defaultSearch,
    });
  };
  return {
    page: defaultPage,
    size: defaultSize,
    search: defaultSearch,
    moveToList,
    moveToModify,
  };
};

export default useCustomMove;
