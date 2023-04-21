const FindCountriesForm = ({formHandler, country, countryHandler}) => {
  return (
  <form className="countries-form" onSubmit={formHandler}>
    <label className="label-wrap">
      <span className="label-name">Find countries</span>
      <input type="text" value={country} onChange={countryHandler}/>
    </label>
  </form>
  );
};

export default FindCountriesForm;
