const Filter = ({filter, filterHandler}) => {
  return (
    <div>
      Filter by name: <input value={filter} onChange={filterHandler} />
    </div>
  );
};

export default Filter;
