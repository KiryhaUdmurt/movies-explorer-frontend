import "./NavTab.css";
import { HashLink } from "react-router-hash-link";

function NavTab() {
  return (
    <div className="navtab">
      <HashLink className="navtab__link" to="#about" smooth>
        Узнать больше
      </HashLink>
    </div>
  );
}

export default NavTab;
