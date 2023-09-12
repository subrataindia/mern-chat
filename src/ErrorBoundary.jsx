import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // You can log the error here or handle it in any way you prefer.
    console.error("Error:", error);
    console.error("Error Info:", info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI here when an error occurs.
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
