import '../styles/globals.css';
import Layout from '../component/Layout';
import 'antd/dist/antd.css';
import '../styles/antd.less';
import {useState, useEffect} from 'react';


function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    );
  }
}

export default MyApp;
