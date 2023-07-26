import "./Switch.css";

function Switch({isToggled, onToggle}) {
  return (
    <label className="switch">
      <input className="switch__input" type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch__slider" />
    </label>
  );
}

export default Switch;