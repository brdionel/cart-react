import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

const SEO = () => {

    const { formatMessage } = useIntl()

    return (
        <Helmet>
            <title>
            {formatMessage({id: "header_title" })}
            </title>
            <meta name="description" content={`${formatMessage({id: "meta_description" })} Bruno Dionel`} />
            <meta property="og:title" content={`${formatMessage({id: "header_title" })}`}/>
            <meta property="og:description" content={`${formatMessage({id: "meta_description" })} Bruno Dionel`}/>
            <meta property="og:url" content={window.location.href} />
            
      </Helmet>
    )
}

export default SEO;