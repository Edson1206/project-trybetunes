import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <span>
            <Link
              data-testid="link-to-search"
              to="/search"
            >
              Search
            </Link>
          </span>
          <span>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favorites
            </Link>
          </span>
          <span>
            <Link
              data-testid="link-to-profile"
              to="/profile"
            >
              Profile
            </Link>
          </span>
        </nav>
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
