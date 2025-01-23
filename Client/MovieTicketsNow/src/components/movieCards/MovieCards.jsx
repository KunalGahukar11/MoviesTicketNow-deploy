import React from 'react';
import { Card, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const { Meta } = Card;

const MovieCards = (props) => {
    const navigate = useNavigate();

    return (
        <>
            <Card
                onClick={() => {
                    navigate(`/movie/${props.id}?date=${moment().format("YYYY-MM-DD")}`)
                }}
                hoverable
                cover={
                    <img
                        alt={props.title}
                        src={props.image}
                        style={{
                            height: '200px', // Fixed height
                            width: '300px',  // Fixed width
                            objectFit: 'cover' // Ensures the image covers the area while maintaining aspect ratio
                        }}
                    />
                }
            >
                <Meta title={props.title} />
                <Rate
                    className='text-xs'
                    disabled
                    allowHalf
                    count={5}
                    defaultValue={props.rating}
                />
            </Card>
        </>
    );
};

export default MovieCards;
