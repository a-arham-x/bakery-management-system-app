import React, { useEffect, useRef } from 'react';

function Alert({ message, alertVisible, setAlertVisible }) {
  const alertRef = useRef(null);

  useEffect(() => {
    let timeoutId;

    const handleClickOutside = (e) => {
      if (alertRef.current && !alertRef.current.contains(e.target)) {
        // Delay closing by 150ms to prevent accidental clicks
        timeoutId = setTimeout(() => setAlertVisible(false), 150);
      } else {
        // If clicked inside quickly, cancel the close
        clearTimeout(timeoutId);
      }
    };

    if (alertVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(timeoutId);
    };
  }, [alertVisible]);

  if (!alertVisible) return null;

  return (
    <div className="modal-wrapper">
      <div className="modal-text" ref={alertRef}>
        {message}
      </div>
    </div>
  );
}

export default Alert;
