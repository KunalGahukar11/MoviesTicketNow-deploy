import React, { useEffect, useState } from 'react';
import { Button, Divider, message, Spin, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, getAllMovies } from '../../api/movie';
import MovieModal from './MovieModal';
import moment from 'moment';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

const MoviesList = () => {
    const dispatch = useDispatch();
    const { loader } = useSelector((store) => store.loaders);
    const [moviesData, setMoviesData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formType, setFormType] = useState('add');
    const [selectedMovie, setSelectedMovie] = useState(null);

    const columns = [
        {
            title: 'Poster',
            dataIndex: 'poster',
            key: 'poster',
            render: (text, data) => {
                return (
                    <img
                        src={data.poster}
                        height="115"
                        width="75"
                        style={{ objectFit: "cover" }}
                    />
                );
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Release On',
            dataIndex: 'release_date',
            key: 'release_date',
            render: (text, data) => {
                return moment(data.release_date).format("MM/DD/YYYY");
            }
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            render: (text, data) => {
                return text.join(', ');
            }
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
            render: (text, data) => {
                return text.join(', ');
            }
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (text, data) => {
                const hour = Math.floor(text / 60);
                const min = text % 60;

                return `${hour}h:${min}m`
            }
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Actions',
            render: (text, data) => {
                return (
                    <div className='inline-flex flex-col gap-2'>
                        <Button color='primary' variant='outlined' onClick={() => {
                            setIsModalOpen(true);
                            setFormType('edit');
                            setSelectedMovie(data);
                        }}>
                            <EditOutlined />
                        </Button>
                        <Button color='danger' variant='outlined' onClick={() => {
                            setIsDeleteModalOpen(true)
                            setSelectedMovie(data)
                        }}>
                            <DeleteOutlined />
                        </Button>
                    </div>
                );
            }
        }
    ];

    const open = () => {
        setIsModalOpen(true);
        setSelectedMovie(null);
        setFormType('add');
    };

    const fetchMovies = async () => {
        try {
            dispatch(showLoader());
            const response = await getAllMovies();
            if (response.success) {
                const allMovies = response.data;

                setMoviesData(
                    allMovies.map((movie) => {
                        return { ...movie, key: `movie${movie._id}` };
                    })
                )
            } else {
                message.error(response.error);
            }
        } catch (error) {
            message.error("Something went wrong!");
        } finally {
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <>
            <section>
                <div className='flex justify-end pr-3'>
                    <Button type='primary' icon={<PlusCircleOutlined></PlusCircleOutlined>} className='font-semibold' onClick={open}>Add Movie</Button>
                </div>
                <Divider></Divider>
                <Spin tip="Loading" size='large' spinning={loader}>
                    <Table dataSource={moviesData} columns={columns}></Table>
                </Spin>
                {
                    isModalOpen && (
                        <MovieModal isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            fetchMovies={fetchMovies}
                            formType={formType}
                            selectedMovie={selectedMovie}
                            setSelectedMovie={selectedMovie}
                        ></MovieModal>
                    )
                }
                {
                    isDeleteModalOpen && (
                        <DeleteModal isDeleteModalOpen={isDeleteModalOpen}
                            setIsDeleteModalOpen={setIsDeleteModalOpen}
                            selectedItem={selectedMovie}
                            fetchData={fetchMovies}
                            deleteFunc={deleteMovie}
                            setSelectedItem={setSelectedMovie}
                            info="movie"
                            deleteKey="movieId">
                        </DeleteModal>
                    )
                }
            </section>
        </>
    )
}

export default MoviesList