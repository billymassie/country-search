import styles from '@/app/page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
const ResultPage = () => {
  return (
    <main className={styles.main}>
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
            <h2>Indonesia</h2>
            <Image
              src='https://picsum.photos/id/1/200/300'
              width={50}
              height={25}
              alt='User'
              style={{ marginLeft: 4 }}
            />
          </div>
          <span
            style={{
              backgroundColor: '#6ecceb',
              borderRadius: 12,
              paddingBlock: 4,
              paddingInline: 16,
              color: 'white',
              marginRight: 6,
            }}
          >
            ID
          </span>
          <span
            style={{
              backgroundColor: '#6ecceb',
              borderRadius: 12,
              paddingBlock: 4,
              paddingInline: 16,
              color: 'white',
              marginRight: 6,
            }}
          >
            Republic of Indonesia
          </span>
          <span
            style={{
              backgroundColor: '#6ecceb',
              borderRadius: 12,
              paddingBlock: 4,
              paddingInline: 16,
              color: 'white',
              marginRight: 6,
            }}
          >
            Republik Indonesia
          </span>
        </div>
        <div style={{ marginTop: 54, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p className={styles.title}>LatLong</p>
            <p className={styles.info}>-5.0, 120.0 </p>
          </div>
          <div>
            <p>Capital: Jakarta</p>
            <p>Region: Asia</p>
            <p>Subregion: South-Eastern Asia</p>
          </div>
        </div>
        <div style={{ marginTop: 54, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p className={styles.title}>Calling Code</p>
            <p className={styles.info}>62</p>
            <p>
              <span style={{ textDecoration: 'underline' }}>1 country</span> with this calling code
            </p>
          </div>
          <div>
            <p className={styles.title}>Currency</p>
            <p className={styles.info}>IDR</p>
            <p>
              <span style={{ textDecoration: 'underline' }}>1 country</span> with this currency
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ResultPage;
