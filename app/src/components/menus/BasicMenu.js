import { Link } from 'react-router-dom';

const BasicMenu = () => (
  <nav
    className='flex bg-blue-300'
    id='navbar'
  >
    <div className='w-4/5 bg-gray-500'>
      <ul className='flex p-4 font-bold text-white'>
        <li className='pr-6 text-2xl'>
          <Link to='/'>Main</Link>
        </li>
        <li className='pr-6 text-2xl'>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
    <div className='flex w-1/5 justify-end bg-orange-300 p-4 font-medium'>
      <div className='m-1 rounded text-sm text-white'>Login</div>
    </div>
  </nav>
);

export default BasicMenu;
