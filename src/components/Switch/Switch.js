import "./Switch.css";

function Switch({ isToggled, setIsToggled }) {
  return (
    <label className="switch">
      <input
        className="switch__input"
        type="checkbox"
        checked={isToggled}
        onChange={() => setIsToggled(!isToggled)}
      />
      <span className="switch__slider" />
    </label>
  );
}

export default Switch;
