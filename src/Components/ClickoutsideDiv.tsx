import React, { useRef, useEffect } from 'react';

interface ClickOutsideDivProps {
  children: React.ReactNode;  
  onOutsideClick: () => void;
}

const ClickOutsideDiv: React.FC<ClickOutsideDivProps> = ({ children, onOutsideClick }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onOutsideClick]);

  return (
    <div ref={divRef}>
      {children}
    </div>
  );
};

export default ClickOutsideDiv;