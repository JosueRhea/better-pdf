import { useEffect, useState } from 'react';
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';

export const usePermissions = () => {
  const [accepted, setAccepted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const requestPermissions = () => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          setAccepted(true);
        }
      })
      .finally(() => setLoaded(true));
  };

  useEffect(() => {
    check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          setAccepted(true);
          setLoaded(true)
          return;
        }
        requestPermissions();
      })
  }, []);

  return {
    accepted,
    requestPermissions,
    loaded
  };
};
