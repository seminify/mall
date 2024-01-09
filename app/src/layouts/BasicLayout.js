import BasicMenu from 'components/menus/BasicMenu';

const BasicLayout = ({ children }) => (
  <>
    <BasicMenu />
    <div className='my-5 flex w-full flex-col space-y-1 bg-white md:flex-row md:space-x-1 md:space-y-0'>
      <main className='bg-sky-300 p-5 md:w-4/5 lg:w-3/4'>{children}</main>
      <aside className='flex bg-green-300 p-5 md:w-1/5 lg:w-1/4'>
        <h1 className='text-2xl md:text-4xl'>Sidebar</h1>
      </aside>
    </div>
  </>
);

export default BasicLayout;
