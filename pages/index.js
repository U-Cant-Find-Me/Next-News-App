import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Home() {
  return (
    <>
    <Head >
      <title>News App Home Page</title>
    </Head>
      <div className='page-container'>
        <div className={styles.main}>
          <h1>Next.js News Application</h1>
          <h3>Go to Feed page for the latest news articles</h3>
        </div>
      </div>
    </>
  )
}
