import React, { createRef } from "react";
import { render } from "@testing-library/react-native";
import Name from "../../../../src/screens/AddStaff/components/Name";

describe("Name Component",() => {
const mockSetErrors = jest.fn();
  const mockHandleInputChange = jest.fn();

  const createComponent = (nameValue: string, error = undefined) => {
    const formData = { fullName: nameValue };
    const errors = { fullName: error };

    const ref = createRef<any>();

    const utils = render(
      <Name
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

  it("should fail validation if name is empty", () => {
    const { ref } = createComponent("");

    const result = ref.current.validate();

    expect(result).toBe(false);
    expect(mockSetErrors).toHaveBeenCalledTimes(1);
  });

  it("should pass validation for a valid name", () => {
    const { ref } = createComponent("john");

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
})