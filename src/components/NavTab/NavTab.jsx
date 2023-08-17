import "./NavTab.css";
import { Link } from "react-scroll";

function NavTab({ scroll }) {
  return (
    <button className="btn btn-scroll" type="button" href="#about">
      <Link
        to="about"
        className="link_color_white"
        smooth={true}
        duration={200}
      >
        Узнать больше
      </Link>
    </button>
  );
}

export default NavTab;
