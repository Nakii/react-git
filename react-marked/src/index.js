import React from 'react';
import { render } from 'react-dom';
// CSS
import './style/css/bootstrap.min.css';
import './index.css';
//JS Perso
import { sampleText } from './sampleText';
// Marked.js
import marked from 'marked';

class App extends React.Component {

    state = {
        text: sampleText
    };

    componentWillMount() {
        const localStorageText = localStorage.getItem('text');

        if(localStorageText) {
            this.setState({ text: localStorageText });
        }
    };

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('text', nextState.text);
    };

    editText = (event) => {
        const text = event.target.value;
        this.setState({text});
    };
    renderText = (text) => {
        // Sanitize : permet de ne pas retranscrire les balises HTML (ex: <h1>exemple</h1>)
        const renderText = marked(text, {sanitize: true});
        return { __html: renderText };
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <textarea className="form-control" value={this.state.text} onChange={(e) => this.editText(e)} cols="30" rows="35">
                        </textarea>
                    </div>
                    <div className="col-md-6">
                        <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
                    </div>
                </div>
            </div>
        )
    };

}

render(
    <App />,
    document.getElementById('root')
);