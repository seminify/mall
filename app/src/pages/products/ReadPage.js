import ReadComponent from 'components/products/ReadComponent';
import { useParams } from 'react-router-dom';

const ReadPage = () => {
  const { pno } = useParams();
  return (
    <div className='w-full bg-white p-4'>
      <div className='text-3xl font-extrabold'>Products Read Page</div>
      <ReadComponent pno={pno} />
    </div>
  );
};

export default ReadPage;
