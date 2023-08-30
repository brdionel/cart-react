import { IntlProvider } from "react-intl";
import { Products } from "./components/products";
import { IS_DEVELOPMENT } from "./configs";
import Header from "./components/header";
import Footer from "./components/footer";
import Drawer from "./components/drawer";
import Filters from "./components/filters";
import ModalWrapper from "./components/modalWrapper";
import Cart from "./components/cart";
import SEO from "./components/seo";
import { useApp } from "./hooks/useApp";
import { useDrawer } from "./hooks/useDrawer";
import Loader from "./components/loader";

function App() {
  const { isDrawerOpen } = useDrawer();
  const { isModalOpen, selectedLanguage, messages, isLoading } = useApp();

  return (
    <IntlProvider
      locale={selectedLanguage}
      messages={messages[selectedLanguage.value]}
    >
      <SEO />
      {isLoading && <Loader />}
      <Header />
      <Filters />
      <Products />
      {isDrawerOpen && (
        <Drawer>
          <Cart />
        </Drawer>
      )}
      {IS_DEVELOPMENT && <Footer />}
      {isModalOpen && <ModalWrapper />}
    </IntlProvider>
  );
}

export default App;
