import React, { Component } from 'react'

import GlobalStyle from './globalStyles'

import axios from 'axios'
import styled from 'styled-components'

import headerBg from './images/pattern-bg.png'

import { SearchField, AddressDetails } from './components'

export class App extends Component {
    constructor(){
        super()
        this.headerElem = React.createRef();
        this.state = {
            headerHeight: null
        }
    }

    componentDidMount(){
        this.getHeaderHeight()
    }

    getHeaderHeight = () => {
        this.setState({headerHeight: this.headerElem.current.offsetHeight})
    }

    render() {
        const Header = styled.div`
            background:url(${props => props.bg});
            width:100%;
            padding:30px 0 110px;

            h1{
                text-align:center;
                color:#fff;
                font-size:1.8rem;
                font-weight:500;
                margin-bottom:30px;
            }
        `;

        return (
            <div>
                <GlobalStyle />
                <div className="mainContainer">
                    <Header bg={headerBg} ref={this.headerElem}>
                        <h1>IP Address Tracker</h1>
                        <SearchField />
                    </Header>
                    <AddressDetails height={this.state.headerHeight}/>
                </div>
            </div>
        )
    }
}

export default App
