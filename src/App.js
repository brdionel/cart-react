import { IntlProvider } from "react-intl";
import { Products } from "./components/products";
import Header from "./components/header";
import Footer from "./components/footer";
import { IS_DEVELOPMENT } from "./configs";
import Drawer from "./components/drawer";
import Filters from "./components/filters";
import ModalWrapper from "./components/modalWrapper";
import Cart from "./components/cart";
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
