import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { DonorProvider } from "./context/DonorContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx"; 


  

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DonorProvider>
    <AuthProvider>
    
    <App />
    </AuthProvider>
    </DonorProvider>
  </StrictMode>
);
