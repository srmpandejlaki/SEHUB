import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/main/headerBar';
import AsideBar from '../components/main/asideBar';
import DashboardPage from '../view/pages/dashboard';
import OptionForm from './pages/form-add-data/option-form';

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
            <Route path="/form-add-data" element={<OptionForm />} />
          </Routes>
        </main>
      </LocaleProvider>
    );
  }
}

export default App
