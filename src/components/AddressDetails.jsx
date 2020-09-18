import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

const AddressDetails = React.forwardRef(({ height, data }, addressDetails) => {

    const [conHeight, setConHeight] = useState();

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
        display:grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap:3%;

        .boxes{
            border-right:1px solid hsl(0, 0%, 59%);


            &:last-child{
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

        const origHeight = addressDetails.current.clientHeight;

        if(origHeight === addressDetails.current.clientHeight){
            const detConHeight = Math.floor(origHeight / 2);
            setConHeight(detConHeight);
        }else{
            return
        }
    })

    const { ip, isp, city, region, postalCode, timezone } = data[0] !== undefined && data[0];
    
    return (
        <DetailsCont height={height} conHeight={conHeight} ref={addressDetails}>
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
})

export default AddressDetails;
