import { useEffect, useState } from 'react';


const useDeviceSize = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTab, setIsTab] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const deviceWidth = window.innerWidth;
            if (deviceWidth < 768) {
              setIsMobile(true);
              setIsDesktop(false);
              setIsTab(false);
            } else if (deviceWidth >= 768 && deviceWidth < 1024) {
              setIsMobile(false);
              setIsDesktop(false);
              setIsTab(true);
            } else {
              setIsMobile(false);
              setIsDesktop(true);
              setIsTab(false);
            }
          });
        },
        { threshold: [0] },
      );
      // @ts-ignore
      observer?.observe(document.querySelector('#device-size-detector'));
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return { isMobile, isDesktop, isTab };
};

export default useDeviceSize;
