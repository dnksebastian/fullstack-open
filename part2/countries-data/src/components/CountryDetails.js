const CountryDetails = ({country}) => {
    const finalCountry = {...country[0]};

    return (
        <div className="country-details">
            <h2>{finalCountry.name.common}</h2>
            <div>
                <p>Capital: {finalCountry.capital[0]}</p>
                <p>Area: {finalCountry.area}</p>
            </div>
            <h3>Languages:</h3>
            <ul className="lang-list">
                {Object.entries(finalCountry.languages).map(([shortname, longname]) => (
                    <li key={shortname}>{longname}</li>
                ))}
            </ul>
            <h3 className="flag-label">Flag:</h3>
            <div className="flag-wrap">
                <img src={finalCountry.flags.png} alt={finalCountry.flags.alt} />
            </div>
        </div>
    )
}

export default CountryDetails