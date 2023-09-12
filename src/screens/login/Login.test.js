import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import LoginContainer from "./Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constants } from "../../utils/constants";

// Mock AsyncStorage using async-storage-mock
/* Remember to mock async storage
Create setupTests.js file in root if not exist and write the below lines
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

in jest.config.js file add below
module.exports = {
  ...
  setupFiles: ["./setupTests.js"],
  ...
};

*/
describe("LoginContainer", () => {
  let mockAxios;
  let getItemSpy;
  let setItemSpy;
  let replaceSpy;

  beforeEach(async () => {
    mockAxios = new MockAdapter(axios);
    getItemSpy = jest.spyOn(AsyncStorage, "getItem"); // Use jest.spyOn to spy on AsyncStorage functions
    setItemSpy = jest.spyOn(AsyncStorage, "setItem"); // Use jest.spyOn to spy on AsyncStorage functions
    replaceSpy = jest.fn();

    // Mock AsyncStorage getItem and setItem
    getItemSpy.mockResolvedValue(null);
    setItemSpy.mockResolvedValue(undefined);
  });

  afterEach(() => {
    mockAxios.reset();
    jest.restoreAllMocks(); // Restore all mocked functions
  });

  it("navigates to home when a token is present", async () => {
    // Mock AsyncStorage.getItem to return a token
    getItemSpy.mockResolvedValue(Constants.authToken);

    const { getByTestId } = render(
      <LoginContainer navigation={{ replace: replaceSpy }} />
    );

    // Wait for AsyncStorage.getItem to resolve
    await waitFor(() => {
      expect(getItemSpy).toHaveBeenCalledWith(Constants.authToken);
      expect(replaceSpy).toHaveBeenCalledWith("Home"); // Adjust to match your navigation destination
    });
  });

  it("handles login success", async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <LoginContainer navigation={{ replace: replaceSpy }} />
    );

    mockAxios
      .onPost(Constants.endpoints.login)
      .reply(200, { token: "mockToken" });

    const emailInput = getByPlaceholderText("Enter Email Address");
    const passwordInput = getByPlaceholderText("Enter Password");

    // Simulate user input
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    // Trigger the onBlur event to update the parent component
    fireEvent(emailInput, "blur");
    fireEvent(passwordInput, "blur");

    // Trigger the login action
    fireEvent.press(getByTestId("login-button"));

    await waitFor(() => {
      expect(mockAxios.history.post[0].data).toEqual(
        JSON.stringify({ email: "test@example.com", password: "password123" })
      );
      expect(setItemSpy).toHaveBeenCalledWith(Constants.authToken, "mockToken");
      expect(replaceSpy).toHaveBeenCalledWith("Home"); // Adjust to match your navigation destination
    });
  });

  it("handles login failure", async () => {
    const { getByText, getByTestId, getByPlaceholderText, queryByText } =
      render(<LoginContainer navigation={{ replace: replaceSpy }} />);

    await waitFor(() => {
      const errorMessage = queryByText(
        "Login failed. Please check your credentials."
      );
      expect(errorMessage).toBeNull();
    });

    // Mock the Axios request to return a 404 error
    mockAxios
      .onPost(Constants.endpoints.login)
      .reply(404, { message: "Invalid credentials" });

    const emailInput = getByPlaceholderText("Enter Email Address");
    const passwordInput = getByPlaceholderText("Enter Password");

    // Simulate user input
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    // Trigger the onBlur event to update the parent component
    fireEvent(emailInput, "blur");
    fireEvent(passwordInput, "blur");

    // Trigger the login action
    fireEvent.press(getByTestId("login-button"));

    await waitFor(() => {
      expect(mockAxios.history.post[0].data).toEqual(
        JSON.stringify({ email: "test@example.com", password: "password123" })
      );

      // Assert that AsyncStorage.setItem should not have been called
      //expect(setItemSpy).not.toHaveBeenCalled();

      // Assert that navigation.replace should not have been called
      expect(replaceSpy).not.toHaveBeenCalled();

      // Assert that the error message is displayed
      expect(
        getByText("Login failed. Please check your credentials.")
      ).toBeTruthy();
    });
  });
});
