import "../../assets/css/profile/action.css";
export default function Action(props) {
  return (
    <div class="card" style={{ width: "18rem" }}>
      <div class="card-body">
        <p class="card-icon">{props.icon}</p>
        <p class="card-title">{props.title}</p>
        <p class="card-text">{props.description}</p>
      </div>
    </div>
  );
}
