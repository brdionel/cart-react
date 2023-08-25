import "./wrapper.css";

const Wrapper = ({children}) => {
    return (
        <div className="wrapperContainer">
            {children}
        </div>
    )
}

export default Wrapper;