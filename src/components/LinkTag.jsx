
import React from "react";


class LinkTag extends React.Component {

    handleCopy = () => {
      const link = this.props.link;
      copyToClipboard(link);
    }
    render() {
      return (
        <a href={this.props.link} onClick={this.handleCopy}>
          {this.props.children}
        </a>
      );
    }
  }
  
  export default LinkTag;