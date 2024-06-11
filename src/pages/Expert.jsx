import {Pagination, message} from "antd";
import '../assets/css/expert.css';
import { useState,useEffect } from "react";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import CardPrice from "../components/expertDetail/CardPrice";
import Slider from "react-slick";
import Loading from '../components/expertDetail/Loading';
import Error from "../components/expertDetail/Error";
import CommentUser from "../components/expertDetail/CommentUser";
import Star from "../components/expertDetail/Star";
import { API_URL } from "../utils/helpers.js";
const Expert = () =>{
    const [pageLoading, setPageLoading] = useState(true);
    const [ref1, inView1] = useInView({ threshold: 0.5 });
    const [experts, setExperts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const [expertName, setExpertName] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [min_price, setMinPrice] = useState(0);
    const [max_price, setMaxPrice] = useState(100);
    const [response, setResponse] = useState([]); 
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [error, setError] = useState(false);
    const handleMinPriceChange = (event) => {
      setMinPrice(event.target.value);
    };
  
    const handleMaxPriceChange = (event) => {
      setMaxPrice(event.target.value);
    };
  
    const handleSubmit = async (event) => {
        const API = `${API_URL}/experts/filter`;
      event.preventDefault();
      try {
        const response = await axios.post(API, { min_price:min_price, max_price:max_price });
        setResponse(response.data.data);
      } catch (error) {
        console.error("There was an error making the request:", error);
      }
    };
    useEffect(() => {
        const fetchExperts = async () => {
            const API = `${API_URL}/experts`;
            try {
                const res = await axios.get(API); // Log the entire response
                setExperts(res.data.data[0]); // Adjust this based on actual API response structure
            } catch (error) {
                console.error("Error", error);
            }
        };

        fetchExperts();
    }, []);
    const searchExpert = async (term) => {
        const API = `${API_URL}/experts/search`;
        setError(false);
        try {
            const res = await axios.post(API, { searchTerm: term });
            setExpertName(res.data.data);
            setSearchPerformed(true); 
            if (res.data.data.length === 0) {
                setError(true);
            }

        } catch (error) {
            console.error("Error fetching data", error);
            setError(true);
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (searchTerm === "") {
            message.error("Please enter something");
        } else {
            searchExpert(searchTerm);
            setSearchTerm("");
        }
    }

    const onChange = (e) => setSearchTerm(e.target.value);
    const handleChange = (page) => {
        setCurrentPage(page);
    };
    const onChangeItem = (id) => {
        console.log(id)
        navigate(`/expert/${id}`);
    }    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
        ],
      };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = experts.slice(indexOfFirstItem,indexOfLastItem);
    useEffect(() => {
        setTimeout(() => {
          setPageLoading(false);
        }, 2000);
      }, []);
    return (
        <div className="Expert">
            <div className="search">
                <div className="wrapper1">
                    <div className="search-wrapper">
                        <label htmlFor="search-form">
                        <form onSubmit={onSubmit} className="form">
                            <input
                                type="text"
                                name="searchTerm"
                                id="search-form"
                                className="search-input"
                                value={searchTerm}
                                onChange={onChange}
                                placeholder="Search for..."
                            />
                        </form>
                        </label>
                        <label>
                        <form onSubmit={handleSubmit}>
                            <label>
                            Min Price:
                                <input
                                    type="range"
                                    value={min_price}
                                    min="0"
                                    max="100"
                                    onChange={handleMinPriceChange}
                                />
                                <span>{min_price}</span>
                                </label>
                                <br />
                            <label>
                            Max Price:
                                <input
                                    type="range"
                                    value={max_price}
                                    min="0"
                                    max="100"
                                    onChange={handleMaxPriceChange}
                                />
                                <span>{max_price}</span>
                            </label>
                            <br />
                            <br />
                            <button className="button-6" type="submit">Filter</button>
                        </form>
                        </label>
                    </div>
                </div>
            </div>
            <div className="card-containerr">
                <Slider {...settings}>
                    {response.map((item,index) => (
                        <CardPrice
                        key={index}
                        name={item.name}
                        price= {item.price}
                        email={item.email}
                        profile_picture={item.profile_picture}
                        id={item.id}
                        />
                    ))}
                </Slider>
            </div>
            <div style={{margin:20}}></div>
            <div className="wrapper search-item">
                {pageLoading ? (
                    <Loading />
                ) : (
                    searchPerformed && error ? (
                        <Error />
                    ) : (
                        expertName.map((item, index) => (
                            <div className="card" key={index}>
                                <img className="card-image" src={item.profile_picture} alt={item.name} />
                                <h2>{item.name}</h2>
                                <p>{item.email}</p>
                                <button className="custom-btn btn-16" onClick={() => onChangeItem(item.id)}>Read More</button>
                            </div>
                        ))
                    )
                )}
            </div>

            <div className="wrapper" ref={ref1}>
                {pageLoading ? (
                    <Loading/>
                ) : (
                    currentItem.map((item, index) => (
                        <div className="card" key={index} style={{ animation: inView1 ? 'yourAnimationName' : 'none' }}>
                            <img className="card-image" src={item.profile_picture} alt={item.name} />
                            <h2>{item.name}</h2>
                            <p>{item.email}</p>
                            <button className="custom-btn btn-16" onClick={() => onChangeItem(item.id)}>
                                Read more
                            </button>
                        </div>
                    ))
                )}
            </div>
        <div className="wrapper" style={{padding:20}}>
            <Pagination
                defaultCurrent={1}
                total={experts.length}
                pageSize={itemsPerPage}
                onChange={handleChange}
                current={currentPage}
            />
        </div>
        <div className="background">
            <h1>Do you know</h1>
            <p>Every year we happily work on many platforms to help everyone have a website that heals everyone's soul. And that is also our mission.</p>
        </div>
        <CommentUser />
        <Star />
    </div>
    )
}
export default Expert;