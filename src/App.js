import React, { Component } from 'react'

import GlobalStyle from './globalStyles'

import axios from 'axios'
import styled from 'styled-components'
import { Map, TileLayer, Marker } from 'react-leaflet'

import headerBg from './images/pattern-bg.png'
import markerIcon from './images/icon-location.svg'

import { SearchField, AddressDetails } from './components'

export class App extends Component {
    constructor(){
        super()
        this.headerElem = React.createRef();
        this.addressDetails = React.createRef();
        this.state = {
            headerHeight: null,
            data: [],
            searchValue: ""
        }
    }

    componentDidMount(){
        this.getHeaderHeight()
        this.setMarker()
    }

    setSearchValue = (searchValue) => {
        this.setState({searchValue}, () => {
            this.setMarker()
        });
    }

    setMarker = async () => {
        try{
            const res = await axios.get(`https://geo.ipify.org/api/v1?apiKey=at_APQYrq7ArKh4p9m1Ff4ITONfJpZGj${this.state.searchValue}`)
            // const res = await axios.get(`https://geo.ipify.org/api/v1?apiKey=at_APQYrq7ArKh4p9m1Ff4ITONfJpZGj&domain=0d2.net`)
            const data = await res;
            if(data.status === 200){

                const { ip, isp, location } = data.data;
                const { city, region, postalCode, timezone, lat, lng } = location

                this.setState({data: [{ip, isp, city, region, postalCode, timezone, lat, lng}]})
            }
        }catch(err){
            if(err.response.status === 422){
                console.log('cant find location');
            }
        }
    }

    getHeaderHeight = () => {
        this.setState({headerHeight: this.headerElem.current.offsetHeight})
    }

    render() {
        const Header = styled.div`
            background:url(${props => props.bg});
            width:100%;
            padding:30px 0 120px;
            background-size:cover;

            h1{
                text-align:center;
                color:#fff;
                font-size:1.8rem;
                font-weight:500;
                margin-bottom:30px;
            }

            @media all and (max-width:624px){
                padding:30px 0 160px;
            }
        `;

        const MapCont = styled.div`
            .leaflet-container{
                width:100%;
                height:calc(100vh - ${props => props.height + "px"});
                z-index:1;
            }
        `;

        const { lat, lng } = this.state.data[0] !== undefined && this.state.data[0]

        // const position = [37.40599, -122.078514]

        const position = [lat !== undefined && lat, lng !== undefined && lng]

        // const L = window.L;

        const iconLocation = window.L.icon({
            iconUrl: markerIcon
        })

        return (
            <div>
                <GlobalStyle />
                <div className="mainContainer">
                    <Header bg={headerBg} ref={this.headerElem}>
                        <h1>IP Address Tracker</h1>
                        <SearchField setMarker={this.setMarker} setSearchValue={this.setSearchValue} />
                    </Header>
                    <AddressDetails height={this.state.headerHeight} data={this.state.data} ref={this.addressDetails}/>
                    <MapCont height={this.state.headerHeight}>
                        <Map center={position} zoom={13}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker 
                                position={position}
                                icon={iconLocation}
                            />
                        </Map>
                    </MapCont>
                </div>
            </div>
        )
    }
}

export default App
