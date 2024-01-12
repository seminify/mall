import ModifyComponent from 'components/member/ModifyComponent';
import BasicLayout from 'layouts/BasicLayout';

const ModifyPage = () => (
  <BasicLayout>
    <div className='text-3xl'>Member Modify Page</div>
    <div className='mt-4 w-full bg-white p-2'>
      <ModifyComponent />
    </div>
  </BasicLayout>
);

export default ModifyPage;
