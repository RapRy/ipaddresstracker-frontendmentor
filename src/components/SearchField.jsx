import React from 'react'

import styled from 'styled-components'

import arrow from '../images/icon-arrow.svg'


const SearchField = ({ setMarker, setSearchValue }) => {

    const SearchFieldCont = styled.div`
        text-align:center;

        input{
            padding:17px 25px;
            border-radius:18px 0 0 18px;
            width:50%;
            border:none;
            font-size: .9rem;
            font-weight:500;
            box-shadow: 0px 0px 20px hsla(0, 0%, 17%, .2);
            color:hsl(0, 0%, 17%);
            cursor:pointer;

            &::placeholder{
                font-size: .8rem;
                color:hsl(0, 0%, 59%);
                font-weight:400;
            }
        }

        button{
            padding:16px 25px 17px;
            border-radius:0 18px 18px 0;
            border:none;
            background:hsl(0, 0%, 17%);
            cursor:pointer;
        }
    `;

    const input = React.createRef();

    const submitSearch = () => {
        const value = input.current.value;
        let newValue = ""
        const regex = /[a-zA-Z]+$/;
        if(value === ""){
            return;
        }else{
            if(regex.test(value)){
                newValue = `&domain=${value}`;
            }else{
                newValue = `&ipAddress=${value}`;
            }
        }
        setSearchValue(newValue);
        setMarker();
    }

    return (
        <SearchFieldCont>
            <form>
                <input type="text" name="search" placeholder="Search for any IP address or domain" ref={input}/>
                <button type="button" onClick={submitSearch}>
                    <img src={arrow} alt="search"/>
                </button>
            </form>
        </SearchFieldCont>
    )
}

export default SearchField;
