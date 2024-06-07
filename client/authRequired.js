// authRequired.js
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const AuthRequired = ({ authChildren }) => {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName !== '/' && pathName !== '/admin') {
      let storedData = localStorage.getItem('userData');
      if (storedData) {
        let userData = JSON.parse(storedData);
        let token = userData.token;
        
        if (!token) {
          router.push('/');
        }
      }

      
    }
  }, []);

  return authChildren;
};

export default AuthRequired;
