// RegisterComponent.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RegisterComponent from "./RegisterComponent";

describe("RegisterComponent", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<RegisterComponent />);

    // Check if important elements are present on the screen
    expect(getByText("Register")).toBeTruthy();
    expect(getByText("Create an account")).toBeTruthy();
    expect(getByPlaceholderText("Enter your name")).toBeTruthy();
    expect(getByPlaceholderText("Enter Email Address")).toBeTruthy();
    expect(getByPlaceholderText("Enter Password")).toBeTruthy();
  });

  it("displays an error message if provided", () => {
    const { getByText } = render(<RegisterComponent error="Test error" />);
    expect(getByText("Test error")).toBeTruthy();
  });

  it('calls handlePress when the "Create Account" button is pressed', () => {
    const handlePressMock = jest.fn();
    const { getByText } = render(
      <RegisterComponent handlePress={handlePressMock} />
    );
    fireEvent.press(getByText("Create Account"));
    expect(handlePressMock).toHaveBeenCalled();
  });

  // Add more test cases as needed
});
