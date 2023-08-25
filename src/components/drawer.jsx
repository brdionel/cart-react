import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";
import { useDrawer } from "../hooks/useDrawer";
import "./drawer.css";

function DrawerContent({ children }) {
  const { isDrawerOpen, drawerRef, isDrawerClosing, handleDrawerClose } =
    useDrawer();

  return (
    <div className={`drawer ${isDrawerClosing ? "closing" : ""}`}>
      <aside className={`drawer-content ${isDrawerOpen ? "active" : ""}`} ref={drawerRef}>
        <div className="button-drawer-close-container">
          <button className="button-drawer-close" onClick={handleDrawerClose}>
            <GrClose />
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}

export default function Drawer(props) {
  return ReactDOM.createPortal(
    <DrawerContent {...props}/>,
    document.getElementById("modal-root")
  );
}
