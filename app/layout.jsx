"use client"

// components/RootLayout.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Providers from '@/app/GlobalRedux/provider';

const RootLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
