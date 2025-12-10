import React, { createRef } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PhoneNumber from "../../../../src/screens/AddStaff/components/PhoneNumber";

describe("PhoneNumber Component", () => {
  const mockSetErrors = jest.fn();
  const mockHandleInputChange = jest.fn();

  const createComponent = (value: string, error = undefined) => {
    const formData = { phoneNumber: value };
    const errors = { phoneNumber: error };

    const ref = createRef<any>();

    const utils = render(
      <PhoneNumber
        ref={ref}
        formData={formData as any}
        errors={errors as any}
        setErrors={mockSetErrors}
        handleInputChange={mockHandleInputChange}
      />
    );

    return { ...utils, ref };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should pass validation if phone number is empty (optional field)", () => {
    const { ref } = createComponent("");

    const result = ref.current.validate();

    expect(result).toBe(true);
    expect(mockSetErrors).not.toHaveBeenCalled();
  });

  it("should fail validation if phone number is not 10 digits", () => {
    const { ref } = createComponent("12345");

    const result = ref.current.validate();

    expect(result).toBe(false);
    expect(mockSetErrors).toHaveBeenCalledTimes(1);

    const updateFn = mockSetErrors.mock.calls[0][0];
    const newState = updateFn({});

    expect(newState).toEqual(
      expect.objectContaining({
        phoneNumber: "Phone number is invalid",
      })
    );
  });

  it("should pass validation for exactly 10 digits", () => {
    const { ref } = createComponent("1234567890");

    const result = ref.current.validate();

    expect(result).toBe(true);
    expect(mockSetErrors).toHaveBeenCalledTimes(1);

    const updateFn = mockSetErrors.mock.calls[0][0];
    const newState = updateFn({});

    expect(newState).toEqual(expect.objectContaining({}));
  });

  it("should expose validate() method through ref", () => {
    const { ref } = createComponent("");

    expect(typeof ref.current.validate).toBe("function");
  });

  it("should call handleInputChange when phone number is changed", () => {
    const { getByPlaceholderText } = createComponent("");

    const input = getByPlaceholderText("(555) 555-5555");

    fireEvent.changeText(input, "9876543210");

    expect(mockHandleInputChange).toHaveBeenCalledWith(
      "phoneNumber",
      "9876543210"
    );
  });
});
