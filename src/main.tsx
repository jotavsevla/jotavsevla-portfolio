import '@fontsource-variable/jetbrains-mono/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './i18n/context';
import './styles/tokens.css';
import './styles/global.css';
import './styles/glitch.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
