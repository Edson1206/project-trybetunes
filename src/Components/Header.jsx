import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      visitor: '',
    };
  }

  componentDidMount = () => {
    this.getVisitorName();
  };

  getVisitorName = async () => {
    this.setState({
      loading: true,
      visitor: '',
    });
    const visitor = await getUser();
    this.setState({
      loading: false,
      visitor: visitor.name,
    });
  };

  render() {
    const { visitor, loading } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        <div>
          <p
            data-testid="header-user-name"
          >
            {loading ? <Loading /> : `Olá, ${visitor}` }
          </p>
        </div>
      </header>

    );
  }
}

export default Header;
