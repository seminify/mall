const ResultModal = ({ title, content, callback }) => (
  <div
    className='fixed left-0 top-0 z-[1055] flex h-full w-full justify-center bg-black bg-opacity-20'
    onClick={() => {
      if (callback) callback();
    }}
  >
    <div className='absolute my-10 w-1/4 min-w-[600px] rounded bg-white px-6 opacity-100 shadow dark:bg-gray-700'>
      <div className='my-6 justify-center border-b-4 border-gray-500 text-2xl'>
        {title}
      </div>
      <div className='border-b-4 border-orange-400 py-4 text-4xl'>
        {content}
      </div>
      <div className='flex justify-end'>
        <button
          className='my-4 rounded bg-blue-500 px-6 py-4 text-lg text-white'
          onClick={() => {
            if (callback) callback();
          }}
        >
          Close Modal
        </button>
      </div>
    </div>
  </div>
);

export default ResultModal;
