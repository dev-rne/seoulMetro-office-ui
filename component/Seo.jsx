import Head from "next/dist/shared/lib/head";

export default function Seo({title}){
    return <Head>
                <title>{title} | Seoul Metro</title>
            </Head>
}