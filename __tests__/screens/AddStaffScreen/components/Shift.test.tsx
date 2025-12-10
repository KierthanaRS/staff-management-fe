// __tests__/screens/AddStaffScreen/components/Shift.test.tsx
import React, { createRef } from "react";
import { render } from "@testing-library/react-native";
import Shift from "../../../../src/screens/AddStaff/components/Shift";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

const mockUseSelector = require("react-redux").useSelector;

describe("Shift Component", () => {
  const mockSetErrors = jest.fn();
  const mockHandleInputChange = jest.fn();

  const createComponent = (
    shiftValue: string,
    error: any = undefined,
    reduxShifts: { id: number; shift_name: string }[] = []
  ) => {
    mockUseSelector.mockImplementation((selectorFn: any) =>
      selectorFn({
        shift: { shifts: reduxShifts },
      })
    );

    const formData = { shift: shiftValue };
    const errors = { shift: error };

    const ref = createRef<any>();

    const utils = render(
      <Shift
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

  it("should fail validation if shift is empty", () => {
    const { ref } = createComponent("");

    const result = ref.current.validate();

    expect(result).toBe(false);
    expect(mockSetErrors).toHaveBeenCalledTimes(1);

    const updateFn = mockSetErrors.mock.calls[0][0];
    const newState = updateFn({});

    expect(newState).toEqual(
      expect.objectContaining({
        shift: "shift is required",
      })
    );
  });

  it("should pass validation if shift is selected", () => {
    const { ref } = createComponent("2");

    const result = ref.current.validate();

    expect(result).toBe(true);

    const updateFn = mockSetErrors.mock.calls[0][0];
    const newState = updateFn({});

    expect(newState).toEqual(expect.objectContaining({}));
  });

  it("should expose validate() on ref", () => {
    const { ref } = createComponent("");

    expect(typeof ref.current.validate).toBe("function");
  });
});
