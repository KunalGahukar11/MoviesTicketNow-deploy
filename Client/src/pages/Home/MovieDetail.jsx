import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById } from '../../api/movie';
import { Divider, message, Rate, Spin, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from '../../redux/slices/loaderSlice';
import { getAllShowsByMovieAndDate } from '../../api/show';
import moment from 'moment';

const MovieDetail = () => {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const [theatre, setTheatre] = useState([]);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDate = (e) => {
        const dateInput = e.target.value;
        setDate(moment(dateInput).format("YYYY-MM-DD"));
        navigate(`/movie/${movieId}/?date=${dateInput}`);
    };

    const getMovieDetails = async () => {
        try {
            dispatch(showLoader());
            const response = await getMovieById(movieId);
            if (response.success) {
                const data = response.data;
                setMovieDetail(data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.error(error);
            message.error("Something went wrong");
        } finally {
            dispatch(hideLoader());
        }
    };

    const getAllTheatreByShows = async () => {
        try {
            dispatch(showLoader());
            console.log(movieId);
            console.log(date);

            const response = await getAllShowsByMovieAndDate({ movie_name: movieId, date });
            if (response.success) {
                const data = response.data;
                console.log(data);
                setTheatre(data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoader());
            message.error("Something went wrong");
        } finally {
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        getMovieDetails();
    }, []);

    useEffect(() => {
        getAllTheatreByShows();
    }, [date]);

    if (!movieDetail) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <Spin></Spin>
            </div>
        );
    }

    return (
        <>
            <section className="w-4/5 mx-auto my-4 flex border border-gray-300 rounded-lg shadow-md p-6 bg-slate-50">
                <div className='flex gap-4'>
                    <div>
                        <img src={movieDetail.poster} alt={movieDetail.title} />
                    </div>
                    <Divider type="vertical" style={{ height: '100%', backgroundColor: '#e0e0e0' }} />
                    <div className='flex flex-col py-3 pl-8 '>
                        <div className="flex flex-col mb-4">
                            <h1 className="mr-2 font-bold text-2xl">{movieDetail.title}</h1>
                            <span className='font-light text-gray-800'>{movieDetail.release_date}</span>
                            <span className='italic'>{movieDetail.genre.join(", ")}</span>
                            <Rate className='text-sm' disabled allowHalf defaultValue={movieDetail.rating} count={5} />
                        </div>

                        <p className='w-2/4 text-gray-800 font-medium'>{movieDetail.description}</p>
                        <div className='mt-4'>
                            <p className='font-medium'>runtime : <span className='italic font-normal text-gray-500'>{movieDetail.duration / 60} hr: {movieDetail.duration % 60} min</span></p>
                            <p className='font-medium'>language : <span className='italic font-normal text-gray-500'>{movieDetail.language.join(", ")}</span></p>
                        </div>
                    </div>
                </div>
            </section>

            <Divider className='bg-gray-200'></Divider>

            <section className='w-4/5 mx-auto'>
                <div className="w-1/4 flex flex-col mt-3 gap-3">
                    <label className="font-semibold text-xl">Choose the date:</label>
                    <Input
                        onChange={handleDate}
                        type="date"
                        min={moment().format("YYYY-MM-DD")}
                        className="max-width-300 mt-8px-mob"
                        value={date}
                        placeholder="default size"
                    />
                </div>
                <div className='flex flex-col mt-10'>
                    {
                        theatre && theatre.map((theatre) => {
                            return (
                                <>
                                    <div key={theatre._id} className='flex flex-col gap-5 border border-gray-400 rounded-md p-5 shadow-sm'>
                                        <h2 className='font-bold text-2xl'>{theatre.name}</h2>
                                        <div className='flex gap-4'>
                                            {
                                                theatre.shows.sort((a, b) => moment(a.show_time, "HH:mm") - moment(b.show_time, "HH:mm")).map((show) => {
                                                    return (
                                                        <div key={show._id} className='border-2 border-yellow-400 p-3 hover:bg-yellow-400 hover:cursor-pointer transition-all'
                                                            onClick={() => { navigate(`/book-show/${show._id}`) }}>
                                                            <p className='text-xl font-semibold'>{moment(show.show_time, "HH:mm A").format("hh:mm A")}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <Divider></Divider>
                                </>
                            )
                        })
                    }
                </div>
            </section>
        </>
    );
};

export default MovieDetail;
