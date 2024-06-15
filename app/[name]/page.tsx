'use client';
import styles from '@/app/page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const ResultPage = () => {
  const { name } = useParams();

  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [callingCode, setCallingCode] = useState<any>(null);
  const [currency, setCurrency] = useState<any>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      if (!name) return;
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fulltext=true`);
        if (res.status === 200) {
          const data = await res.json();
          setCountry(data[0]);
          const callingCode = data[0].idd.root[1] + data[0].idd.suffixes;
          fetchCallingCode(callingCode);
          const currencies = Object.keys(data[0].currencies)[0];
          fetchCurrency(currencies);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCallingCode = async (callingCode: string) => {
      try {
        const res = await fetch(`https://restcountries.com/v2/callingcode/${callingCode}`);
        if (res.status === 200) {
          const data = await res.json();
          setCallingCode(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCurrency = async (currency: string) => {
      try {
        const res = await fetch(`https://restcountries.com/v2/currency/${currency}`);
        if (res.status === 200) {
          const data = await res.json();
          setCurrency(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountry();
  }, [name]);

  return (
    <main className={styles.main}>
      {!loading && !country && <p>Not found</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            width: '100%',
          }}
        >
          <button
            style={{
              backgroundColor: '#7c53b5',
              borderRadius: 6,
              padding: 8,
              border: 'none',
              color: '#ffffff',
              marginBottom: 18,
            }}
          >
            <Link
              href='/'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <FaArrowLeft /> Back to Homepage
            </Link>
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2>{country?.name.common}</h2>
              <Image
                src={country.flags.png}
                width={50}
                height={25}
                alt=''
                style={{ marginLeft: 4 }}
              />
            </div>
            {country?.altSpellings.map((e: string, index: number) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#6ecceb',
                  borderRadius: 12,
                  paddingBlock: 4,
                  paddingInline: 16,
                  color: 'white',
                  marginRight: 6,
                }}
              >
                {e}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 54, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p className={styles.title}>LatLong</p>
              <p className={styles.info}>
                {country?.latlng[0]}.0, {country?.latlng[1]}.0
              </p>
            </div>
            <div>
              <p>Capital: {country.capital[0]}</p>
              <p>Region: {country.continents[0]}</p>
              <p>Subregion: {country.subregion}</p>
            </div>
          </div>
          <div style={{ marginTop: 54, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p className={styles.title}>Calling Code</p>
              <p className={styles.info}>
                {country.idd.root[1]}
                {country.idd.suffixes}
              </p>
              <div className={styles.tooltip}>
                {callingCode?.length} country{' '}
                <div className={styles.tooltiptext}>
                  {callingCode?.map((e: any) => (
                    <p
                      style={{ fontSize: 12, textAlign: 'left', padding: 4 }}
                      key={e.name}
                    >
                      {e.name}
                    </p>
                  ))}
                </div>
              </div>{' '}
              <span>with this currency</span>
            </div>
            <div>
              <p className={styles.title}>Currency</p>
              <p className={styles.info}>
                {country.currencies ? Object.keys(country.currencies)[0] : null}
              </p>
              <div className={styles.tooltip}>
                {currency?.length} country{' '}
                <div className={styles.tooltiptext}>
                  {currency?.map((e: any) => (
                    <p
                      style={{ fontSize: 12, textAlign: 'left', padding: 4 }}
                      key={e.name}
                    >
                      {e.name}
                    </p>
                  ))}
                </div>
              </div>{' '}
              <span>with this currency</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
export default ResultPage;
