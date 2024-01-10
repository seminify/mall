const FetchingModal = () => (
  <div className='fixed left-0 top-0 z-[1055] flex h-full w-full place-items-center justify-center bg-black bg-opacity-20'>
    <div className='flex h-1/4 min-w-min items-center justify-center rounded-3xl bg-white opacity-100'>
      <div className='m-20 text-4xl font-extrabold text-orange-400'>
        Loading.....
      </div>
    </div>
  </div>
);

export default FetchingModal;
