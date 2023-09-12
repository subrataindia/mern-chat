// Register.test.tsx
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import axios from "axios"; // You may want to use a mock library for axios
import Register from "./Register";
import MockAdapter from "axios-mock-adapter";
import { Constants } from "../../utils/constants";
import { RouteKeys } from "../../Navigator/RouteKeys";

// Mock axios post request for testing
//jest.mock("axios");

describe("Register Container", () => {
  let mockAxios: MockAdapter;
  let replaceSpy: jest.Mock<any, any, any>;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    replaceSpy = jest.fn();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("handles registration successfully", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <Register navigation={{ navigate: replaceSpy }} />
    );

    const nameInput = getByPlaceholderText("Enter your name");
    const emailInput = getByPlaceholderText("Enter Email Address");
    const passwordInput = getByPlaceholderText("Enter Password");

    // Simulate user input
    fireEvent.changeText(nameInput, "John");
    fireEvent.changeText(emailInput, "john@example.com");
    fireEvent.changeText(passwordInput, "password123");

    // Trigger the onBlur event to update the parent component
    fireEvent(nameInput, "blur");
    fireEvent(emailInput, "blur");
    fireEvent(passwordInput, "blur");

    // Mock the axios.post method to return a successful response
    mockAxios
      .onPost(Constants.endpoints.register)
      .reply(200, { data: { message: "User registered successfully" } });

    // Trigger the registration button click
    fireEvent.press(getByTestId("create-account-button"));

    // Wait for success message
    // await waitFor(() => getByText("Registration Successful!"));
    //expect(getByText("Registration Successful!")).toBeTruthy();
    await waitFor(() => {
      expect(replaceSpy).toHaveBeenCalledWith(RouteKeys.Login);
    });
  });

  it("handles registration failure", async () => {
    const { getByText, getByPlaceholderText } = render(<Register />);

    const nameInput = getByPlaceholderText("Enter your name");
    const emailInput = getByPlaceholderText("Enter Email Address");
    const passwordInput = getByPlaceholderText("Enter Password");

    // Simulate user input
    fireEvent.changeText(nameInput, "John");
    fireEvent.changeText(emailInput, "john@example.com");
    fireEvent.changeText(passwordInput, "password123");

    // Trigger the onBlur event to update the parent component
    fireEvent(nameInput, "blur");
    fireEvent(emailInput, "blur");
    fireEvent(passwordInput, "blur");

    // Mock the axios.post method to return an error response
    mockAxios.onPost(Constants.endpoints.register).reply(404, {
      response: { data: { message: "Registration failed" } },
    });

    // Trigger the registration button click
    fireEvent.press(getByText("Create Account"));

    // Wait for error message
    //await waitFor(() => getByText("Unable to register!"));
    //expect(getByText("Unable to register!")).toBeTruthy();
    await waitFor(() => {
      expect(replaceSpy).not.toHaveBeenCalled();
    });
  });

  // Add more test cases as needed
});
