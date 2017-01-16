import React from 'react';
import Formulaire from './formulaire';
import Message from './message';
import base from '../base';
// CSS
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../animation.css';

class App extends React.Component {

    state = {
        messages: {}
    };

    componentWillMount() {
        this.ref = base.syncState('/', {context: this, state: 'messages'});
    };

    componentDidUpdate() {
        // Met le scroll en bas
        this.messages.scollTop = this.messages.scrollHeight;
    };

    addMessage = (message) => {
        // Copier le state
        // ... Récupère tous les élements dans l'ojet
        const messages = {...this.state.messages};

        // On ajoute le message avec une clé timestamp
        const timestamp = Date.now();
        messages[`message-${timestamp}`] = message;

        // On supprime si plus de 10 messages
        Object.keys(messages).slice(0, -10).map(key => messages[key] = null);

        // Met à jour le state
        // ou this.setState({ messages: messages });
        this.setState({ messages });
    };

    isUser = (pseudo) => {
        return pseudo === this.props.params.pseudo;
    };

    render(){

        const messages = Object.keys(this.state.messages).map(key => <Message key={key} details={this.state.messages[key]} isUser={this.isUser} />);

        return(
            <div className="box">
                <div>
                    <div className="messages" ref={input => this.messages = input}>
                        <ReactCSSTransitionGroup component="div" className="message" transitionName="message" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                            {messages}
                        </ReactCSSTransitionGroup>
                    </div>
                    <div className="messages">
                        <Formulaire addMessage={this.addMessage} pseudo={this.props.params.pseudo} length={140} />
                    </div>
                </div>
            </div>
        )

    }

    static propTypes = {
        params: React.PropTypes.object.isRequired
    }
}

export default App;