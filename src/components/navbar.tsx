import '../css/navbar.css';
import { PageProps } from '../functions/types';
const Nav = (props: PageProps) => {

  return (
    <div className="app-nav">
      <div className="app-home" onClick={() =>props.switchTo("main")}>
        <img className="app-logo" src="/img/navbar/logo.png" alt="RecoFlat logo" />
      </div>
      <div className="app-actions">
        <div className="app-action" onClick={() =>props.switchTo("howtouse")}>
          <div>How to use?</div>
          <img className="app-logo" src="img/navbar/Vector.png" alt="icon"/>
        </div>
        <div className="app-action" onClick={() =>props.switchTo("aboutus")}>
          <div>About us</div>
          <img className="app-logo" src="/img/navbar/human.png" alt="icon"/>
        </div>
      </div>
    </div>
  );
};

export default Nav;