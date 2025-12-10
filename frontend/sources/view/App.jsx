import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/base/headerBar';
import AsideBar from '../components/base/asideBar';
import DashboardPage from '../view/pages/dashboard';
import ProductPage from './pages/product';
import SettingPage from './pages/setting';
import InventoryPage from './pages/inventory-product/inventory-page';
import InventoryHistoryPage from './pages/inventory-product/inventory-history';
import DistributionPage from './pages/distribution-product/distribution-page';
import DistributionHistoryPage from './pages/distribution-product/distribution-history';
import ReturnPage from './pages/return-page';

import LocaleContext, { LocaleProvider } from '../contexts/localContext';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localeContext: {
        locale: 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: prevState.localeContext.locale === 'id' ? 'en' : 'id'
              }
            }
          })
        }
      }
    };
  };

  render() {
    return (
      <LocaleProvider value={this.state.localeContext}>
        <main className="main-side">
          <Header />
          <AsideBar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/product/inventory" element={<InventoryPage />} />
            <Route path="/product/inventory-history" element={<InventoryHistoryPage />} />
            <Route path="/product/distribution" element={<DistributionPage />} />
            <Route path="/product/distribution-history" element={<DistributionHistoryPage />} />
            <Route path="/product/return" element={<ReturnPage />} />
          </Routes>
        </main>
      </LocaleProvider>
    );
  }
}

export default App
