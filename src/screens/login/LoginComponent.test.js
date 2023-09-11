import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LoginComponent from "./LoginComponent";

describe("LoginComponent", () => {
  it("renders without crashing", () => {
    const { getByText, getByPlaceholderText } = render(<LoginComponent />);

    // Check if the component renders the title and subtitle
    // expect(getByText("Login")).toBeTruthy();
    expect(getByText("Use Existing credentials!")).toBeTruthy();

    // Check if the email and password input fields render
    expect(getByPlaceholderText("Enter Email Address")).toBeTruthy();
    expect(getByPlaceholderText("Enter Password")).toBeTruthy();
  });

  it("handles user input correctly", () => {
    const { getByPlaceholderText } = render(<LoginComponent />);
    const emailInput = getByPlaceholderText("Enter Email Address");
    const passwordInput = getByPlaceholderText("Enter Password");

    // Simulate user input
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    // Check if the input fields have been updated
    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password123");
  });

  it("displays error message when there is an error", () => {
    const { getByText } = render(<LoginComponent error="Login failed" />);

    // Check if the error message is displayed
    expect(getByText("Login failed")).toBeTruthy();
  });
});
