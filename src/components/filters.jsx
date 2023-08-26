import { useState, useEffect, useRef } from "react";
import ReactSlider from "react-slider";
import { BsSliders } from "react-icons/bs";
import { FormattedMessage, useIntl } from "react-intl";
import { useFilter } from "../hooks/useFilter";
import { useApp } from "../hooks/useApp";
import { useDrawer } from "../hooks/useDrawer";
import Dropdown from "./dropdown";
import Wrapper from "./wrapper";
import "./filters.css";

const Filters = () => {
  const { setFilters, filters, orderByOptions, categoryOptions, handleCategorySelected, getCategoryNameByOption, getOrderNameByOption, handleOrderByOptionSelected } = useFilter();
  const dropDownRef = useRef();
  const { minPrice, maxPrice } = filters;
  const [, setSliderLoaded] = useState(false);
  const { products } = useApp();
  const { filterProducts } = useFilter();
  const { formatMessage } = useIntl();
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const { isDrawerOpen} = useDrawer()

  useEffect(() => {
    if(isDrawerOpen) {
      setIsOpen(false)
    }
  }, [isDrawerOpen])

  const handleChangePrice = (values) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: values[0],
      maxPrice: values[1],
    }));
  };

  const sliderRef = useRef(null);

  const handleSliderAfterChange = () => {
    setSliderLoaded(true);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isOpenDropDown &&
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target)
      ) {
        setIsOpenDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpenDropDown]);

  return (
    <Wrapper>
      <section className="filters-container">
        <div className="filters-container-header">
          <div>
            <small className="filters-container-header-products-qty">
              {filterProducts(products.products).length}{" "}
              <FormattedMessage id="products" />
            </small>
          </div>
          <div className="filter-and-order-container">
            <div className={`collapsible`} onClick={toggleAccordion}>
              <div
                className={`collapsible-header ${isOpen ? "open" : ""}`}
              >
                <h3 className="collapsible-header-button">
                  <span className="collapsible-header-button-text">
                    <span className="collapsible-header-button-text-verb">
                      {`${
                        isOpen
                          ? formatMessage({ id: "hide" })
                          : formatMessage({ id: "show" })
                      }`}
                    </span>{" "}
                    <FormattedMessage id="filters" />
                  </span>
                  <BsSliders />
                </h3>
              </div>
            </div>
            <Dropdown
              label_id={"sort_by"} 
              options={orderByOptions} 
              handleOptionSelected={handleOrderByOptionSelected}
              getNameByOption={getOrderNameByOption}
            />
          </div>
        </div>
        <div className="filters-container-content">
          <div className={`collapsible-content ${isOpen ? "open" : ""}`}>
            <div className="filters">
              <div className="react-slider-container">
                <div className="tooltip">
                  <div className="tooltip-arrow"></div>
                  <p className="price-range-text">
                    <FormattedMessage id="between" />
                    {' '}
                    <FormattedMessage id="money_symbol"/>
                    {minPrice}
                    {" "}
                    <FormattedMessage id="and"/>
                    {' '}
                    <FormattedMessage id="money_symbol"/>
                    {maxPrice}
                  </p>
                </div>
                <ReactSlider
                  ref={sliderRef}
                  className="horizontal-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  defaultValue={[0, 1750]}
                  ariaLabel={["Lower thumb", "Upper thumb"]}
                  ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                  value={[minPrice, maxPrice]}
                  min={0}
                  max={1750}
                  pearling
                  minDistance={100}
                  onChange={handleChangePrice}
                  onAfterChange={handleSliderAfterChange}
                />
              </div>
              <Dropdown
                label_id={"category"} 
                options={categoryOptions}
                handleOptionSelected={handleCategorySelected}
                getNameByOption={getCategoryNameByOption}
              />
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Filters;
