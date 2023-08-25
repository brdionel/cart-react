import { FormattedMessage } from "react-intl";
import "./sliderHeader.css";

const SliderHeader = () => {
  return (
    <div className="content-sliderRE">
      <div className="sliderRE">
        <div className="maskRE">
          <ul>
            <li className="anim1RE">
              <div className="quoteRE">
                <FormattedMessage id={"sliderHeader_firstMessage"} />
              </div>
            </li>
            <li className="anim2RE">
              <div className="quoteRE">
                <div className="quoteRE">
                  <FormattedMessage id={"sliderHeader_secondMessage"} />
                </div>
              </div>
            </li>
            <li className="anim3RE">
              <div className="quoteRE">
                <FormattedMessage id={"sliderHeader_thirdMessage"} />
              </div>
            </li>
            <li className="anim4RE">
              <div className="quoteRE">
                <FormattedMessage id={"sliderHeader_fourthMessage"} />
              </div>
            </li>
            <li className="anim5RE">
              <div className="quoteRE">
                <FormattedMessage id={"sliderHeader_fifthMessage"} />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SliderHeader;
