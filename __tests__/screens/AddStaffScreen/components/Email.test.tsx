import React, { createRef } from "react";
import { render } from "@testing-library/react-native";
import Email from "../../../../src/screens/AddStaff/components/Email";

describe("Email Component", () => {
  const mockSetErrors = jest.fn();
  const mockHandleInputChange = jest.fn();

  const createComponent = (emailValue: string, error = undefined) => {
    const formData = { email: emailValue };
    const errors = { email: error };

    const ref = createRef<any>();

    const utils = render(
      <Email
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

  it("should fail validation if email is empty", () => {
    const { ref } = createComponent("");

    const result = ref.current.validate();

    expect(result).toBe(false);
    expect(mockSetErrors).toHaveBeenCalledTimes(1);
  });

  it("should fail validation if email is invalid", () => {
    const { ref } = createComponent("invalid-email");

    const result = ref.current.validate();

    expect(result).toBe(false);
    expect(mockSetErrors).toHaveBeenCalledTimes(1);
  });

  it("should pass validation for a valid email", () => {
    const { ref } = createComponent("test@example.com");

    const result = ref.current.validate();

    expect(result).toBe(true);
    expect(mockSetErrors).toHaveBeenCalledWith(
      expect.objectContaining({})
    );
  });

  it("should expose validate() method via ref", () => {
    const { ref } = createComponent("");

    expect(typeof ref.current.validate).toBe("function");
  });
});
