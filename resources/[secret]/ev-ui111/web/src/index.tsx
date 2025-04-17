import { createRoot } from 'react-dom/client';
import './base-app.scss';
import './index.css';
import App from './base-app';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  RecoilRoot,
} from 'recoil';

import { InitStores, storeObj } from 'lib/redux';
import { Provider } from 'react-redux';

InitStores();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={storeObj}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Provider>
);