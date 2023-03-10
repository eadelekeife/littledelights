import "./index.css";

import React from 'react';
import ReactDOM from 'react-dom/client';

import DonationsPage from "./donate";

const DonationsApp = () => {
  return (
    <div>
      <DonationsPage />
    </div>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<DonationsApp />);