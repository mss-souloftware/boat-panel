// authRequired.js
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const AuthRequired = ({ authChildren }) => {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if(pathName !== '/' && pathName !== '/admin') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
      }
    }
  }, []);

  return authChildren;
};

export default AuthRequired;
