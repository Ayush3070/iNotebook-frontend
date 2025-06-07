import React from 'react';

const Alert = ({ alert }) => {
  return (
    alert && (
      <div
        className={`alert alert-${alert.type} animate__animated animate__fadeInDown`}
        role="alert"
        style={{ position: 'fixed', top: '10px', width: '100%', zIndex: '9999', textAlign: 'center' }}
      >
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
