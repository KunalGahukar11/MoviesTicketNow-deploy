import React, { useEffect, useState } from 'react'
import { Row, Col, message } from 'antd';
import { getAllMovies } from '../../api/movie';
import MovieCards from '../../components/movieCards/MovieCards';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ReleasedMovies = () => {
    const [allReleaseMovies, setAllReleaseMovies] = useState([]);
    const navigate = useNavigate();

    const getAllReleaseMovies = async () => {
        try {
            const response = await getAllMovies();
            if (response.success) {
                const data = response.data;
                console.log(data);
                setAllReleaseMovies(data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllReleaseMovies();
        console.log(allReleaseMovies);
    }, []);

    return (
        <>
            <section className='flex flex-col items-center'>
                <div className='mb-3'>
                    <h1 className='text-4xl font-semibold'>Movies</h1>
                </div>
                <div className='self-start w-full'>
                    <Row gutter={[16, 16]}>
                        {
                            allReleaseMovies && allReleaseMovies.map((movie) => {
                                return (
                                    <Col xs={24} sm={24} md={3} lg={3} key={movie._id}>
                                        <MovieCards
                                            id={movie._id}
                                            title={movie.title}
                                            image={movie.poster}
                                            rating={movie.rating}></MovieCards>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </section>
        </>
    )
}

export default ReleasedMovies