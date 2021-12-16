import axios from 'axios';
import { useEffect } from 'react';

export default function me() {
  useEffect(() => {
    axios
      .get(`${process.env.API_HOST}/me`)
      .then((res) => console.log(res.data))
      .catch((err) => console.warn(err));
  }, []);

  return <div className="container"></div>;
}
