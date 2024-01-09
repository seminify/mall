import ReadComponent from 'components/todo/ReadComponent';
import { useParams } from 'react-router-dom';

const ReadPage = () => {
  const { tno } = useParams();
  return (
    <div className='mt-6 w-full bg-white font-extrabold'>
      <div className='text-2xl'>Todo Read Page</div>
      <ReadComponent tno={tno} />
    </div>
  );
};

export default ReadPage;
