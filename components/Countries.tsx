"use client";

import Link from "next/link";
import { shallow } from "zustand/shallow";
// Fetch Data
import useSWR from "swr";
// Global State
import useStore from "../hooks/useStore";
// Fetch Loading
import Loading from "../app/loading";

interface CountryInfo {
    name: { common: string };
    flags: { png: string };
    region: string;
    capital: string;
    population: string;
}

export default function Countries() {
    const [continent, country] = useStore(
        ({ continent, country }) => [continent, country],
        shallow
    );
    const { data, error, isLoading } = useSWR(
        "https://restcountries.com/v3.1/all",
        (url: string) => fetch(url).then((res) => res.json())
    );

    function renderCountry(
        {
            name: { common: commonName },
            flags: { png: flagPNG },
            region,
            capital,
            population,
        }: CountryInfo,
        index: number
    ) {
        if (
            (continent === "All" || region === continent) &&
            (country === "" || commonName.toLowerCase().includes(country))
        ) {
            return (
                <Link href={"/" + commonName} key={index} className="country">
                    <img src={flagPNG} alt={commonName} />
                    <div className="info">
                        <h3>{commonName}</h3>
                        <p>
                            Population:{" "}
                            <span className="result">
                                {population.toLocaleString()}
                            </span>
                        </p>
                        <p>
                            Region: <span className="result">{region}</span>
                        </p>
                        <p>
                            Capital: <span className="result">{capital}</span>
                        </p>
                    </div>
                </Link>
            );
        }
    }

    return (
        <section className="countries">
            <div className="container">
                {error || isLoading ? (
                    <Loading />
                ) : (
                    data.map((country: CountryInfo, index: number) =>
                        renderCountry(country, index)
                    )
                )}
            </div>
        </section>
    );
}
