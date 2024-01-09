const PageComponent = ({ data, movePage }) => (
  <div className='m-6 flex justify-center'>
    {data.prev ? (
      <div
        className='m-2 w-16 p-2 text-center font-bold text-blue-400'
        onClick={() =>
          movePage({
            page: data.prevPage,
          })
        }
      >
        Prev
      </div>
    ) : (
      <></>
    )}
    {data.pageNumList.map((page) => (
      <div
        className={`m-2 w-12 rounded p-2 text-center text-white shadow-md ${
          data.current === page ? 'bg-gray-500' : 'bg-blue-400'
        }`}
        key={page}
        onClick={() =>
          movePage({
            page,
          })
        }
      >
        {page}
      </div>
    ))}
    {data.next ? (
      <div
        className='m-2 w-16 p-2 text-center font-bold text-blue-400'
        onClick={() =>
          movePage({
            page: data.nextPage,
          })
        }
      >
        Next
      </div>
    ) : (
      <></>
    )}
  </div>
);

export default PageComponent;
