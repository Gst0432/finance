import React from 'react';
import { useStore } from '../../store/useStore';

interface AdComponentProps {
  slot: string;
  format: 'horizontal' | 'rectangle' | 'vertical';
}

export default function AdComponent({ slot, format }: AdComponentProps) {
  const { showAds } = useStore();
  const adContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!showAds || !adContainerRef.current) return;

    // Clear any existing content
    while (adContainerRef.current.firstChild) {
      adContainerRef.current.removeChild(adContainerRef.current.firstChild);
    }

    // Configuration based on format
    const formatConfig = {
      horizontal: {
        width: '728px',
        height: '90px'
      },
      rectangle: {
        width: '336px',
        height: '280px'
      },
      vertical: {
        width: '160px',
        height: '600px'
      }
    }[format];

    try {
      // Create the ad element
      const adElement = document.createElement('ins');
      adElement.className = 'adsbygoogle';
      adElement.style.display = 'block';
      adElement.style.width = formatConfig.width;
      adElement.style.height = formatConfig.height;
      adElement.style.margin = '0 auto';
      adElement.setAttribute('data-ad-client', 'ca-pub-4239485692060509');
      adElement.setAttribute('data-ad-slot', slot);
      adElement.setAttribute('data-ad-format', 'auto');
      adElement.setAttribute('data-full-width-responsive', 'true');

      // Append the ad element
      adContainerRef.current.appendChild(adElement);

      // Push the ad
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error pushing ad:', error);
      }
    } catch (error) {
      console.error('Error creating ad element:', error);
    }

    // Cleanup function
    return () => {
      if (adContainerRef.current) {
        while (adContainerRef.current.firstChild) {
          adContainerRef.current.removeChild(adContainerRef.current.firstChild);
        }
      }
    };
  }, [slot, format, showAds]);

  if (!showAds) return null;

  return (
    <div 
      ref={adContainerRef}
      className="ad-container my-4"
      style={{
        minHeight: format === 'horizontal' ? '90px' : 
                  format === 'rectangle' ? '280px' : '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  );
}

// Add types for window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}