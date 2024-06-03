// Login.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from ".";

test("Login with correct credentials", () => {
  // Arrange
  const mockOnLogin = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <Login onLogin={mockOnLogin} />
  );
  const usernameInput = getByPlaceholderText("Username");
  const passwordInput = getByPlaceholderText("Password");
  const loginButton = getByText("Login");

  // Act
  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(loginButton);

  // Assert
  expect(mockOnLogin).toHaveBeenCalledWith("testuser", "password123");
});
