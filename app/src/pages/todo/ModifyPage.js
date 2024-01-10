import ModifyComponent from 'components/todo/ModifyComponent';
import { useParams } from 'react-router-dom';

const ModifyPage = () => {
  const { tno } = useParams();
  return (
    <div className='w-full bg-white p-4'>
      <div className='text-3xl font-extrabold'>Todo Modify Page</div>
      <ModifyComponent tno={tno} />
    </div>
  );
};

export default ModifyPage;
