import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NestedButton from "../../../../src/screens/AddStaff/components/NestedButton";

import Toast from "react-native-toast-message";

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (fn: any) => mockUseSelector(fn),
}));


jest.mock("../../../../src/app/slice/staffSlice", () => ({
  createStaff: jest.fn((data) => ({ type: "CREATE_STAFF", payload: data })),
  updateStaffData: jest.fn((data) => ({ type: "UPDATE_STAFF", payload: data })),
}));

describe("NestedButton Component", () => {
  const mockValidate = jest.fn();
  const mockSetFormData = jest.fn();
  const mockSetLoading = jest.fn();

  const defaultProps = {
    isEdit: false,
    editId: undefined,
    loading: false,
    validateForm: mockValidate,
    setFormData: mockSetFormData,
    setLoading: mockSetLoading,
    formData: {
      fullName: "John",
      email: "john@test.com",
      phoneNumber: "9999999999",
      shift: "1",
      role: "Manager",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSelector.mockImplementation((selectorFn) =>
      selectorFn({
        staff: {
          staffList: [],
          roleCapacity: { manager: 2 },
        },
      })
    );
  });

  it("should not proceed if validateForm() returns false", () => {
    mockValidate.mockReturnValue(false);

    const { getByText } = render(<NestedButton {...defaultProps} />);

    fireEvent.press(getByText("Save Staff Member"));

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(Toast.show).not.toHaveBeenCalled();
  });

  it("should show error toast if role capacity is reached", () => {
    mockValidate.mockReturnValue(true);

    mockUseSelector.mockImplementation((selectorFn) =>
      selectorFn({
        staff: {
          staffList: [
            { shift_id: 1, role: "manager", id: 5 },
            { shift_id: 1, role: "manager", id: 6 },
          ],
          roleCapacity: { manager: 2 },
        },
      })
    );

    const { getByText } = render(<NestedButton {...defaultProps} />);

    fireEvent.press(getByText("Save Staff Member"));

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "error",
        text1: "Manager limit reached in this shift.",
      })
    );

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("should dispatch createStaff when not editing", () => {
    mockValidate.mockReturnValue(true);

    const { getByText } = render(<NestedButton {...defaultProps} />);

    fireEvent.press(getByText("Save Staff Member"));

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "CREATE_STAFF",
      })
    );

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({ type: "success" })
    );

    expect(mockSetFormData).toHaveBeenCalledWith({
      fullName: "",
      phoneNumber: "",
      email: "",
      shift: "",
      role: "",
    });

    expect(mockNavigate).toHaveBeenCalledWith("Main", {
      screen: "StaffStatus",
    });
  });

  it("should dispatch updateStaffData when editing", () => {
    mockValidate.mockReturnValue(true);

    const props = {
      ...defaultProps,
      isEdit: true,
      editId: 10,
    };

    const { getByText } = render(<NestedButton {...props} />);

    fireEvent.press(getByText("Save Staff Member"));

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "UPDATE_STAFF" })
    );

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({ type: "success" })
    );
  });

  it("should navigate to staff screen when cancel is pressed", () => {
    const { getByText } = render(<NestedButton {...defaultProps} />);

    fireEvent.press(getByText("Cancel"));

    expect(mockNavigate).toHaveBeenCalledWith("Main", {
      screen: "StaffStatus",
    });
  });
});
