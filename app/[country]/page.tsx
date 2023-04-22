import Link from "next/link";

interface CountryInfo {
    name: { common: string; nativeName: { [key: string]: { common: string } } };
    flags: { png: string };
    region: string;
    subregion: string;
    population: string;
    capital: string;
    tld: string;
    languages: { [key: string]: string };
    currencies: { [key: string]: { name: string; symbol: string } };
}

interface Params {
    params: { country: string };
}

type CountryData = [CountryInfo, string[] | null];

export function generateMetadata({ params: { country } }: Params) {
    return { title: country.replace(/%20/g, " ") };
}

async function fetchCountry(countryParam: string): Promise<CountryData> {
    const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryParam}?fullText=true`
    );
    const json = await response.json();

    if ("borders" in json[0]) {
        const borders = [];
        for (const border of json[0].borders) {
            const borderResponse = await fetch(
                "https://restcountries.com/v3.1/alpha/" + border
            );
            const jsonBorder = await borderResponse.json();

            borders.push(jsonBorder[0].name.common);
        }

        return [json[0], borders];
    }
    return [json[0], null];
}

export default async function Country({
    params: { country: countryParam },
}: Params) {
    const [
        {
            name: { common: commonName, nativeName },
            flags: { png: flagPNG },
            region,
            subregion,
            population,
            capital,
            tld,
            languages,
            currencies,
        },
        borders,
    ]: CountryData = await fetchCountry(countryParam);

    return (
        <section className="country-details">
            <div className="container">
                <img src={flagPNG} alt={commonName} />
                <div className="info">
                    <h1>{commonName}</h1>
                    <p>
                        Native Name:{" "}
                        <span className="result">
                            {Object.values(nativeName)[0].common}
                        </span>
                    </p>
                    <p>
                        Population:{" "}
                        <span className="result">
                            {population.toLocaleString()}
                        </span>
                    </p>
                    <p>
                        Capital: <span className="result">{capital}</span>
                    </p>
                    <p>
                        Region: <span className="result">{region}</span>
                    </p>
                    <p>
                        Subregion: <span className="result">{subregion}</span>
                    </p>
                    <p>
                        Languages:{" "}
                        <span className="result">
                            {Object.values(languages).reduce(
                                (x, y) => x + "," + y
                            )}
                        </span>
                    </p>
                    <p>
                        Currencies:{" "}
                        <span className="result">
                            {Object.values(currencies)[0].name} (
                            {Object.values(currencies)[0].symbol})
                        </span>
                    </p>
                    <p>
                        Top Level Domain: <span className="result">{tld}</span>
                    </p>
                    {borders && (
                        <>
                            <p>Borders Countries: </p>
                            <ul>
                                {borders.map((name, index) => (
                                    <li key={index}>
                                        <Link href={"/" + name}>{name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
