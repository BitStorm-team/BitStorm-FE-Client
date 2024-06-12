import React from "react";
import { StarTwoTone } from "@ant-design/icons";
import {Card} from "antd";
const CommentUser = () => {
    return (
        <div className="comment" >
        <h1>Comment of Customer</h1>
        <p className="p">Comments from users who have participated in scheduling</p>
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
                The content on the website is very high quality and useful for readers. The information on the website is very rich and detailed, very useful. The website interface is very beautiful and intuitive, easy to find the necessary information.
                </p>
                <img src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg" alt="" />
            </Card >
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
                The user experience on the website is really great, very smooth and easy. The website works well on both computers and mobile phones, very convenient. Customer service through the website is very fast and professional.
                </p>
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
                <p>
                Your website is easy to find on search engines, proving very good SEO. The website's features are rich and easy to use. I received very good support from the team through the website .The response speed of the website is really great.
                </p>
                <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/anh-avatar-facebook-7-1.jpg" alt="" />
            </Card>
        </div>
    </div>
    )
}
export default CommentUser;