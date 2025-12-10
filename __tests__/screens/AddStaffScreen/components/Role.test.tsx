import React, { createRef } from "react";
import { render } from "@testing-library/react-native";
import Role from "../../../../src/screens/AddStaff/components/Role";

describe("Role Component",() => {
const mockSetErrors = jest.fn();
  const mockHandleInputChange = jest.fn();

  const createComponent = (roleValue: string, error = undefined) => {
    const formData = { role: roleValue };
    const errors = { role: error };

    const ref = createRef<any>();

    const utils = render(
      <Role
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

  it("should fail validation if role is empty", () => {
    const { ref } = createComponent("");

    const result = ref.current.validate();

    expect(result).toBe(false);
    expect(mockSetErrors).toHaveBeenCalledTimes(1);
  });

  it("should pass validation for a role name", () => {
    const { ref } = createComponent("Manager");

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