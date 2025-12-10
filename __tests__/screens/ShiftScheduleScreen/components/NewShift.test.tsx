import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NewShift from "../../../../src/screens/ShiftSchedules/components/NewShift";

jest.mock("react-native-toast-message", () => ({ show: jest.fn() }));

jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) =>
    fn({
      shift: { status: "idle" },
    })
  ),
  useDispatch: () => jest.fn(),
}));

jest.mock("../../../../src/components/common/TimePicker", () => {
  const React = require('react');
  const { TextInput } = require('react-native');
  
  return ({ label, value, onChange }: any) => (
    <TextInput
      testID={`time-picker-${label.toLowerCase().replace(' ', '-')}`}
      value={value}
      onChangeText={onChange}
      placeholder="HH:MM"
    />
  );
});

describe("NewShift Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show error when shift name is missing", () => {
    const { getByText } = render(<NewShift />);

    fireEvent.press(getByText("+  Create Shift Schedule"));

    expect(getByText("Shift name is required")).toBeTruthy();
  });

  it("should show error when start or end time is missing", () => {
    const { getByText, getByPlaceholderText } = render(<NewShift />);

    fireEvent.changeText(
      getByPlaceholderText("Shift Name (e.g., Closing Shift)"),
      "Morning Shift"
    );

    fireEvent.press(getByText("+  Create Shift Schedule"));

    expect(getByText("Start time and end time are required")).toBeTruthy();
  });

  it("should show error when end time is before start time", () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<NewShift />);

    fireEvent.changeText(
      getByPlaceholderText("Shift Name (e.g., Closing Shift)"),
      "Shift A"
    );

    fireEvent.changeText(getByTestId('time-picker-start-time'), '10:00');
    fireEvent.changeText(getByTestId('time-picker-end-time'), '09:00');

    fireEvent.press(getByText("+  Create Shift Schedule"));

    expect(getByText("End time must be after start time")).toBeTruthy();
  });

  it("should show error when no days are selected", () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<NewShift />);

    fireEvent.changeText(
      getByPlaceholderText("Shift Name (e.g., Closing Shift)"),
      "Shift A"
    );

    fireEvent.changeText(getByTestId('time-picker-start-time'), '09:00');
    fireEvent.changeText(getByTestId('time-picker-end-time'), '17:00');

    fireEvent.press(getByText("+  Create Shift Schedule"));

    expect(getByText("At least one day must be selected")).toBeTruthy();
  });

  it("should NOT show validation errors when form is complete", () => {
    const { getByText, getByPlaceholderText, queryByText, getByTestId } = render(<NewShift />);

    fireEvent.changeText(
      getByPlaceholderText("Shift Name (e.g., Closing Shift)"),
      "Day Shift"
    );

    fireEvent.changeText(getByTestId('time-picker-start-time'), '08:00');
    fireEvent.changeText(getByTestId('time-picker-end-time'), '16:00');

    fireEvent.press(getByText("Mon")); 

    fireEvent.press(getByText("+  Create Shift Schedule"));

    expect(queryByText("Shift name is required")).toBeNull();
    expect(queryByText("Start time and end time are required")).toBeNull();
    expect(queryByText("End time must be after start time")).toBeNull();
    expect(queryByText("At least one day must be selected")).toBeNull();
  });
});