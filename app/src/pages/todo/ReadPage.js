import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

const ReadPage = () => {
  const { tno } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page'))
    : 1;
  const size = searchParams.get('size')
    ? parseInt(searchParams.get('size'))
    : 10;
  const search = createSearchParams({
    page,
    size,
  }).toString();
  const moveToModify = (tno) => {
    navigate({
      pathname: `../modify/${tno}`,
      search,
    });
  };
  return (
    <div className='mt-6 w-full bg-white font-extrabold'>
      <div className='text-2xl'>Todo Read Page {tno}</div>
      <div>
        <button onClick={() => moveToModify(tno)}>Test Modify</button>
      </div>
    </div>
  );
};

export default ReadPage;
