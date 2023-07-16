import { Link } from "react-router-dom";
import "./NavTab.css";

function NavTab() {
  return (
    <div className="navtab">
      <Link className="navtab__link" to="">
        Узнать больше
      </Link>
    </div>
  );
}

export default NavTab;
