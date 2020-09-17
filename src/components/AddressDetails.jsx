import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

const AddressDetails = ({ height, data }) => {

    const [conHeight, setConHeight] = useState();

    const detailsContElem = React.createRef();

    const DetailsCont = styled.div`
        background:#fff;
        box-shadow: 0px 0px 20px hsla(0, 0%, 17%, .2);
        border-radius:15px;
        padding:25px 40px;
        width:85%;
        position:absolute;
        top:${props => props.height - props.conHeight}px;
        left:50%;
        transform:translateX(-50%);
        z-index:2;

        .boxes{
            display:inline-block;
            width:25%;
            height:100%;
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

        const origHeight = detailsContElem.current.clientHeight;

        const detConHeight = Math.floor(origHeight / 2);

        detailsContElem.current.style.cssText = `height:${origHeight}px`;

        console.log(origHeight);

        setConHeight(detConHeight);

    }, [detailsContElem])

    const { ip, isp, city, region, postalCode, timezone } = data[0] != undefined && data[0];
    
    return (
        <DetailsCont height={height} conHeight={conHeight} ref={detailsContElem}>
           <div className="boxes">
                <span className="label">IP ADDRESS</span>
                <h2>{ip}</h2>
           </div>
           <div className="boxes">
                <span className="label">LOCATION</span>
                <h2>{city}, {region} {postalCode}</h2>
           </div>
           <div className="boxes">
                <span className="label">TIMEZONE</span>
                <h2>UTC {timezone}</h2>
           </div>
           <div className="boxes">
                <span className="label">ISP</span>
                <h2>{isp}</h2>
           </div>
        </DetailsCont>
    )
}

export default AddressDetails;
