import React                from 'react';
import { setDocumentTitle } from '../../utils';

class HomeIndex extends React.Component {
  componentDidMount() {
    setDocumentTitle('Home');
  }

  render() {
    return (
      <div>
        Restricted Regler view
      </div>
    );
  }
}

export default HomeIndex;
