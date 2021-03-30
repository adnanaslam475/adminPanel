
import 'typeface-muli';
import './react-table-defaults';
import './react-chartjs-2-defaults';
import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';

import App from 'app/App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

serviceWorker.unregister();
