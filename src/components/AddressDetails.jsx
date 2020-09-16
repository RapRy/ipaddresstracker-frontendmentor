import React, { useEffect, useState, useRef } from 'react'

import styled from 'styled-components'

const AddressDetails = ({ height }) => {

    const [conHeight, setConHeight] = useState();
    const [boxHeight, setBoxHeight] = useState();
    
    const detailsContElem = useRef(null);

    const DetailsCont = styled.div`
        background:#fff;
        box-shadow: 0px 0px 20px hsla(0, 0%, 17%, .2);
        border-radius:15px;
        padding:25px 40px;
        width:90%;
        position:absolute;
        top:${props => props.height - props.conHeight}px;
        left:50%;
        transform:translateX(-50%);

        .boxes{
            display:inline-block;
            width:25%;
            height:${props => props.boxHeight}px;
            padding:0 3%;
            vertical-align:text-top;
            border-right:1px solid hsl(0, 0%, 59%);

            &:first-child{
                padding-left:0;
            }

            &:last-child{
                padding-right:0;
                border-right:none;
            }

            span{
                font-size:.7rem;
                margin-bottom:10px;
                display:block;
                color:hsl(0, 0%, 59%);
                font-weight:700;
            }

            h2{
                font-size:1.2rem;
                color:hsl(0, 0%, 17%);
                font-weight:700;
            }
        }
    `;

    useEffect(() => {
        const origHeight = detailsContElem.current.offsetHeight;

        const detConHeight = Math.floor(origHeight / 2);
        const boxConHeight = origHeight - 50;

        setConHeight(detConHeight);
        setBoxHeight(boxConHeight);
    }, [detailsContElem])
    
    return (
        <DetailsCont height={height} conHeight={conHeight} boxHeight={boxHeight} ref={detailsContElem}>
           <div className="boxes">
                <span className="label">IP ADDRESS</span>
                <h2>192.212.174.101</h2>
           </div>
           <div className="boxes">
                <span className="label">LOCATION</span>
                <h2>Brooklyn, NY 10001</h2>
           </div>
           <div className="boxes">
                <span className="label">TIMEZONE</span>
                <h2>UTC -05:00</h2>
           </div>
           <div className="boxes">
                <span className="label">ISP</span>
                <h2>SpaceX Starlink</h2>
           </div>
        </DetailsCont>
    )
}

export default AddressDetails;
