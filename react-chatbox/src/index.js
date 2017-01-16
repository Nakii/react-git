import React from 'react';
import { render } from 'react-dom';
// COMPONENTS
import Connexion from './components/connexion';
import App from './components/app';
import NotFound from './components/notfound';
// ROUTER
import { BrowserRouter, Match, Miss } from 'react-router';
// CSS
import './index.css';

const Root = () => {
    return (
        <BrowserRouter>
            {/* Nécessite d'être dans une div. Sinon ça ne fonctionne pas ! */}
            <div>
                <Match exactly pattern="/" component={Connexion} />
                <Match pattern="/pseudo/:pseudo" component={App} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
};

render (
    <Root />,
    document.getElementById('root')
);