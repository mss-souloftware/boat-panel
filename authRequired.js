// authRequired.js
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthRequired = ({ authChildren }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
    }
  }, []);

  return authChildren;
};

export default AuthRequired;
