import {Card,Pagination, message } from "antd";
import '../assets/css/expert.css';
import { StarTwoTone } from "@ant-design/icons";
import { useState,useEffect,useParams } from "react";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
const Expert = () =>{
    const [ref1, inView1] = useInView({ threshold: 0.5 });
    const [experts, setExperts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const [expertName, setExpertName] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchExpert = async (term) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/experts/search", { searchTerm: term });
            setExpertName(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }
    useEffect(() => {
        searchExpert()
    },[])
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
    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/experts");
                console.log(res.data); // Log the entire response
                setExperts(res.data.data[0]); // Adjust this based on actual API response structure
            } catch (error) {
                console.error("Error", error);
            }
        };

        fetchExperts();
    }, []);

    const handleChange = (page) => {
        setCurrentPage(page);
    };
    // Calculate the items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = experts.slice(indexOfFirstItem,indexOfLastItem);
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
                            {/* <span className="sr-only">Search countries here</span> */}
                        </label>
                        <div className="select">
                            <select
                                className="custom-select"
                                aria-label="Filter Countries By Region"
                            >
                                <option value="">Filter By Money</option>
                            </select>
                            <span className="focus"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrapper">
                {expertName.map(item => (
                        <div className="card" key={item.id}  animate={inView1}>
                            <img className="card-image" src={item.profile_picture} alt={item.name} />
                            <h2>{item.name}</h2>
                            <p>{item.email}</p>
                            <button className="custom-btn btn-16" >Read More</button>
                        </div>
                    ))}
            </div>
        <div className="wrapper" ref={ref1}>
                {currentItem.map(item => (
                    <div className="card" key={item.id}  animate={inView1}>
                        <img className="card-image" src={item.profile_picture} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>{item.email}</p>
                        <button className="custom-btn btn-16" >Read More</button>
                    </div>
                ))}
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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero id enim distinctio harum sit, debitis quod voluptate velit repellendus ullam veniam quae a eius totam facere eligendi esse, autem neque!</p>
        </div>
        <div className="comment" ref={ref1}>
            <h1>Comment of Customer</h1>
            <p className="p">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit tempora sed ex quae quasi excepturi ad voluptas, aliquid rerum molestias accusamus explicabo quaerat, asperiores quam voluptatem molestiae ullam impedit qui?</p>
            <div className="card-comment">
                <Card animate={inView1}
                    bordered={false}
                    style={{
                    width: 300,
                    }} className="card-details">
                    <div className="star">
                        <StarTwoTone />
                        <StarTwoTone />
                        <StarTwoTone />
                        <StarTwoTone />
                        <StarTwoTone />
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, sunt? Quia praesentium maiores, culpa dolore vero laborum accusamus earum dicta consequuntur voluptatem quidem excepturi dolores, autem, doloribus veritatis hic est.
                    </p>
                    <img src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg" alt="" />
                </Card >
                <Card  animate={inView1}
                    bordered={false}
                    style={{
                    width: 300,
                    }} className="card-details">
                    <div className="star">
                        <StarTwoTone />
                        <StarTwoTone />
                        <StarTwoTone />
                        <StarTwoTone />
                        <StarTwoTone />
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nihil amet voluptates fugit facere repellat ipsam, ad repellendus sequi iure eos nobis iste sunt tenetur praesentium accusantium eum cum officia?</p>
                    <img src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg" alt="" />
                </Card>
                <Card  animate={inView1}
                    bordered={false}
                    style={{
                    width: 300,
                    }} className="card-details">
                    <div className="star">
                        <StarTwoTone />
                        <StarTwoTone />
                        <StarTwoTone />
                        <StarTwoTone />
                        <StarTwoTone />
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est sequi nisi eligendi ipsum accusantium. Repellendus nulla tempore incidunt! Cupiditate ex porro, nesciunt hic illo earum nisi voluptate maxime corporis!</p>
                    <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/anh-avatar-facebook-7-1.jpg" alt="" />
                </Card>
            </div>
        </div>
        <div className="stats-container">
        <div className="stat-item">
            <span className="stat-number">+3.500</span>
            <span className="stat-label">Người dùng</span>
        </div>
        <div className="stat-item">
            <span className="stat-number">+15</span>
            <span className="stat-label">Chuyên gia tâm lý hàng đầu</span>
        </div>
        <div className="stat-item">
            <span className="stat-number">+10</span>
            <span className="stat-label">Cuộc gặp mặt trên một tháng</span>
        </div>
    </div>
    </div>
    )
}
export default Expert;