import { useParams } from 'react-router-dom';

const ReadPage = () => {
  const { tno } = useParams();
  return (
    <div className='mt-6 w-full bg-white font-extrabold'>
      <div className='text-2xl'>Todo Read Page {tno}</div>
    </div>
  );
};

export default ReadPage;
