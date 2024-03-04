import React, { useState } from 'react';
import { Toast, Button } from 'react-bootstrap';

const ToastComponent = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToastWithMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);

    // Hide the toast after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div>
      <Button onClick={() => showToastWithMessage('Custom message here')}>
        Show Toast
      </Button>
      
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastComponent;
