import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import styles from '../../styles/feed.module.css'

const Feed = ({ pageNumber, articles }) => {
    const router = useRouter();
    // console.log(articles, pageNumber, totalResults);
    return (
        <>
        <Head>
            <title>{`News App Feed Page - ${pageNumber}`}</title>
        </Head>
            <div className="page-contaier">
                <div className={styles.main}>
                    {articles.map((articles, index) => (
                        <div key={index} className={styles.post}>
                            <h1 onClick={() => (window.location.href = articles.url)}>{articles.title}</h1>
                            <p>{articles.description}</p>
                            {!!articles.urlToImage && <img src={articles.urlToImage} />}
                        </div>
                    ))}
                </div>

                <div className={styles.paginator}>
                    <div onClick={() => {
                        if (pageNumber > 1) {
                            router.push(`/feed/${pageNumber - 1}`)
                        }
                    }}
                        className={pageNumber === 1 ? styles.disabled : styles.active}>
                        Previous page
                    </div>
                    <div>#{pageNumber}</div>

                    <div onClick={() => {
                        if (pageNumber < 20) {
                            router.push(`/feed/${pageNumber + 1}`)
                        }
                    }}
                        className={pageNumber === 20 ? styles.disabled : styles.active}>
                        Next page
                    </div>
                </div>

            </div>
        </>
    )
};

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.slug;

    const apiResponse = await fetch(
        `https://newsapi.org/v2/everything?q=sports&pageSize=5&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
            },
        },
    );

    const apiJson = await apiResponse.json();
    const { articles, totalResults } = apiJson;

    if (!pageNumber || pageNumber < 1 || pageNumber > 20) {
        return {
            props: {
                articles: [],
                pageNumber: 1,
            }
        }
    }

    return {
        props: {
            articles,
            pageNumber: Number.parseInt(pageNumber),
            totalResults,
        }
    }
}

export default Feed;