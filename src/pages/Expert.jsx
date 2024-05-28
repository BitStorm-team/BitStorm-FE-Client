import { Carousel,Card } from "antd";
import '../assets/css/expert.css';
import { StarTwoTone } from "@ant-design/icons";
const Expert = () =>{
    const contentStyle = {
        margin: 0,
        height: '460px',
        width: '1300px',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        backgroundImage: 'url("path-to-your-image.jpg")', // Thay thế bằng đường dẫn đến ảnh của bạn
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
      const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
    return (
        <div className="Expert">
            <div className="carousel">
            <Carousel afterChange={onChange} className="carousel">
                <div>
                <img src="https://media.istockphoto.com/id/1213515925/vi/vec-to/kh%C3%A1i-ni%E1%BB%87m-c%E1%BB%A7a-%C4%91%E1%BB%99i-ng%C5%A9-y-t%E1%BA%BF.jpg?s=612x612&w=0&k=20&c=Cx2WpYwUG_hu71r2-sZkV6ae8DlTuonaM64t8vmHsSI=" alt="ảnh" style={contentStyle}/>
                </div>
                <div>
                    <img src="https://ddk.1cdn.vn/2023/05/03/image.daidoanket.vn-images-upload-05032023-_xu-phat-bac-si-1682732079035924647917_5aef7fd5.jpeg" alt="ảnh" style={contentStyle}/>
                </div>
                <div>
                    <img src="https://image.nhandan.vn/w800/Files/Images/2021/08/06/501A3369-1628216683510.jpg.webp" alt="ảnh" style={contentStyle}/>
                </div>
                <div>
                    <img src="https://nld.mediacdn.vn/2020/3/23/9039620610212637445889418153362171059765248o-158496854249670836900.jpg" alt="ảnh" style={contentStyle}/>
                </div>
            </Carousel>
            </div>
            <div className="search">
            <div className="wrapper1">
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search for..."
                        />
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
            <div className="card">
                <img className="card-image" src="https://htmediagroup.vn/wp-content/uploads/2023/03/Anh-bac-si-nam-8-min.jpg" alt="" />
                <h2>Mr. Mỹ</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quis libero exercitationem distinctio facere tenetur dolore officia aspernatur, eligendi assumenda. Optio possimus ab laboriosam, odio aspernatur porro eum consectetur doloribus.</p>
                <button class="custom-btn btn-16">Read More</button>
            </div>
            <div className="card">
                <img className="card-image" src="https://htmediagroup.vn/wp-content/uploads/2023/03/Anh-bac-si-nam-8-min.jpg" alt="" />
                <h2>Mr. Mỹ</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quis libero exercitationem distinctio facere tenetur dolore officia aspernatur, eligendi assumenda. Optio possimus ab laboriosam, odio aspernatur porro eum consectetur doloribus.</p>
                <button class="custom-btn btn-16">Read More</button>
            </div>
            <div className="card">
                <img className="card-image" src="https://htmediagroup.vn/wp-content/uploads/2023/03/Anh-bac-si-nam-8-min.jpg" alt="" />
                <h2>Mr. Mỹ</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quis libero exercitationem distinctio facere tenetur dolore officia aspernatur, eligendi assumenda. Optio possimus ab laboriosam, odio aspernatur porro eum consectetur doloribus.</p>
                <button class="custom-btn btn-16">Read More</button>
            </div>
            <div className="card">
                <img className="card-image" src="https://htmediagroup.vn/wp-content/uploads/2023/03/Anh-bac-si-nam-8-min.jpg" alt="" />
                <h2>Mr. Mỹ</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quis libero exercitationem distinctio facere tenetur dolore officia aspernatur, eligendi assumenda. Optio possimus ab laboriosam, odio aspernatur porro eum consectetur doloribus.</p>
                <button class="custom-btn btn-16">Read More</button>
            </div>
        </div>
        <button class="custom-btn btn-16 btn">Read more</button>
        <div className="background">
            <h1>Do you know</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero id enim distinctio harum sit, debitis quod voluptate velit repellendus ullam veniam quae a eius totam facere eligendi esse, autem neque!</p>
        </div>
        <div className="comment">
            <h1>Comment of Customer</h1>
            <p className="p">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit tempora sed ex quae quasi excepturi ad voluptas, aliquid rerum molestias accusamus explicabo quaerat, asperiores quam voluptatem molestiae ullam impedit qui?</p>
            <div className="card-comment">
                <Card
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
                </Card>
                <Card
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
                <Card
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