import "./NavTab.css";
import { Link } from "react-scroll";

function NavTab({ scroll }) {
  return (
    <Link
      to="about"
      className="link_color_white btn-scroll btn"
      smooth={true}
      duration={200}
    >
      Узнать больше
    </Link>
  );
}

export default NavTab;
