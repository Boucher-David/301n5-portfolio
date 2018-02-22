import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';


class App extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
                <div>Hello</div>
        )
    }

}
ReactDom.render(<App />, document.getElementById('app'));