export default function cardExpert({name, experience}) {
    return (
      <div className="card">
        <img
          className="card-image"
          src="https://htmediagroup.vn/wp-content/uploads/2023/03/Anh-bac-si-nam-8-min.jpg"
          alt=""
        />
        <h2>{ name }</h2>
        <p>
          { experience }
        </p>
        <div className="card-button">
          <button class="custom-btn btn-16">View More</button>
        </div>
      </div>
    );
}