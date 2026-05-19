import '@fontsource-variable/jetbrains-mono/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Poc2App } from './poc2/Poc2App';
import { LanguageProvider } from './i18n/context';
import './styles/tokens.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <Poc2App />
    </LanguageProvider>
  </StrictMode>,
);
