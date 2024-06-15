'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Home<T extends { name: { common: string } }>() {
  const [search, setSearch] = useState('');
  const [suggestion, setSuggestion] = useState<T[]>([]);
  const [isNotFound, setIsNotFound] = useState(false);

  const fetchSuggestion = async () => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${search}`);
      if (res.status === 200) {
        const data = await res.json();
        setSuggestion(data);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search !== '') {
      const getSuggestion = setTimeout(() => {
        fetchSuggestion();
      }, 1500);
      return () => clearTimeout(getSuggestion);
    }
  }, [search]);

  return (
    <main className={styles.main}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Country</h1>
        <input
          type='text'
          id='search'
          style={{ width: '100%', height: '40px', borderRadius: '8px' }}
          onChange={e => setSearch(e.target.value)}
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '40px',
          }}
        >
          {isNotFound ? (
            <p style={{ color: 'tomato' }}>Data Not Found</p>
          ) : (
            suggestion.map((e, index) => <p key={index}>{e.name?.common}</p>)
          )}
        </div>
      </div>
    </main>
  );
}
