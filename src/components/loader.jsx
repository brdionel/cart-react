import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./loader.css";

export function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner">
        <AiOutlineLoading3Quarters />
      </div>
    </div>
  );
}

export default Loader;
