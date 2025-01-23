import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getShowByShowId } from '../../api/show';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';
import { Button, Divider, message } from 'antd';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import { bookShow, makePaymentForShow } from '../../api/bookings';

const BookShow = () => {
    const { user } = useSelector((store) => store.users);
    const { showId } = useParams();
    const [showDetail, setShowDetail] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const dispatch = useDispatch();
    const [isFixed, setIsFixed] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    const getShowDetails = async () => {
        try {
            dispatch(showLoader());
            const response = await getShowByShowId(showId);
            if (response.success) {
                console.log(response.data);

                setShowDetail(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(hideLoader());
            message.error("Something went wrong");
        } finally {
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        console.log(isFixed);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        getShowDetails();
    }, []);

    if (!showDetail) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'><h4>Loading...</h4></div>
        )
    }

    const handleBook = (e) => {
        const seat = e.target.innerText;
        if (showDetail.booked_seats.includes(seat)) {
            message.info("Already booked");
        } else {
            if (selectedSeats.includes(seat)) {
                setSelectedSeats(prev => prev.filter(s => s !== seat));
            } else {
                setSelectedSeats(prev => [...prev, seat]);
            }
        }
    };

    const getSeats = () => {
        const columns = 12;
        const totalSeats = showDetail.total_seats;
        const totalRows = Math.floor(totalSeats / columns);

        return (
            <div>
                <div className='flex flex-col items-center gap-3'>
                    <div className='w-2/4 text-center flex flex-col gap-3 mb-4'>
                        <hr className='border-2 border-blue-300 w-full' />
                        <p className='text-lg font-semibold'>screen this way</p>
                    </div>
                    <div>
                        <ul>
                            {
                                Array.from(Array(totalRows).keys()).map((rows) => {
                                    let codeNum = 65;
                                    return (
                                        <li className='flex'>
                                            {
                                                Array.from(Array(columns).keys()).map((cols) => {
                                                    let seatClass = "default-seats";
                                                    let char = String.fromCharCode(codeNum);
                                                    let seatNumber = (rows + 1).toString().concat(char);
                                                    codeNum += 1;
                                                    if (selectedSeats.includes(seatNumber)) {
                                                        seatClass = "selected";
                                                    }
                                                    if (showDetail.booked_seats.includes(seatNumber)) {
                                                        seatClass = "booked";
                                                    }
                                                    return (
                                                        <button className={seatClass}
                                                            onClick={(e) => {
                                                                handleBook(e);
                                                            }}>
                                                            {seatNumber}
                                                        </button>
                                                    )
                                                })
                                            }
                                        </li>
                                    )
                                }
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    };

    const book = async (transactionId) => {
        try {
            dispatch(showLoader());
            const response = await bookShow({
                show: showId,
                user: user._id,
                seats: selectedSeats,
                transactionId,
            });
            if (response.success) {
                message.success(response.message);
                navigate("/");
                console.log(response);

            } else {
                message.error(reponse.message);
            }
        } catch (error) {
            console.log(error);

            dispatch(hideLoader());
            message.error("Something went wrong");
        } finally {
            dispatch(hideLoader());
        }
    };

    const onToken = async (token) => {
        try {
            dispatch(showLoader());
            const response = await makePaymentForShow(token, showDetail.price * selectedSeats.length * 100);
            if (response.success) {
                message.success(response.message);
                book(response.data);
                console.log(response);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(hideLoader());
            message.error("Something went wrong");
        } finally {
            dispatch(hideLoader());
        }
    };

    return (
        <>
            <section>
                <div className='w-5/6 mx-auto'>
                    <div className='flex justify-between'>
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-xl font-bold'>{showDetail.theatre.name}</h3>
                            <h4 className='text-lg font-medium'>{showDetail.movie_name.title}</h4>
                            <h4 className='text-lg font-medium'>{moment(showDetail.show_time, "HH:mm").format("hh:mm A")}</h4>
                            <div className='flex gap-5 items-center mt-4'>
                                <h5 className='text-sm font-medium'>Price: <span className='italic text-slate-700'>{showDetail.price}</span></h5>
                                <h5 className='text-sm font-medium'>Total seats: <span className='italic text-slate-700'>{showDetail.total_seats}</span></h5>
                            </div>
                        </div>
                        <div className='w-1/2 p-5 border border-gray-200 shadow-sm rounded-sm'>
                            <div className='flex flex-col gap-3'>
                                <h4 className='italic text-sm font-normal text-slate-600 '>Selected seats : <span className='text-sm font-semibold'>{selectedSeats.length > 0 ? selectedSeats.join(",") : "not selected any seats yet!"}</span></h4>
                                {
                                    selectedSeats.length > 0 && (
                                        <StripeCheckout
                                            token={onToken}
                                            amount={selectedSeats.length * showDetail.price * 100}
                                            stripeKey='pk_test_51Qj32pKvPvtNUOz6QKoW3bN7LvlwLjhhSOFWGOQdW27zdpmclHQNuxglnkG0S8aIJnFrzVcHMMUCa6SndzQ2ewlg00AbFDEp3G'>
                                            <Button color='primary' variant='solid' className='w-2/5'>Pay {showDetail.price * selectedSeats.length}</Button>
                                        </StripeCheckout>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <Divider className='bg-slate-300'></Divider>
                    {getSeats()}
                </div>
            </section>
        </>
    )
}

export default BookShow