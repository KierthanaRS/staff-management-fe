import staffReducer, {
  fetchStaffs,
  createStaff,
  updateStaffData,
  deleteStaffData,
  clearStaffError,
} from '../../src/app/slice/staffSlice';

import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Staff Slice Tests', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      staffList: [],
      selectedStaff: null,
      loading: false,
      error: null,
      status: 'idle',
      roleCapacity: {
        waiter: 5,
        cleaner: 3,
        cashier: 1,
        chef: 2,
        manager: 1,
      },
    };
  });

  it('should handle fetchStaffs.fulfilled', async () => {
    const mockData = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Alice' },
    ];

    mockedAxios.get.mockResolvedValue({ data: { data: mockData } });

    const result = await fetchStaffs()(
      jest.fn(),
      () => initialState,
      undefined,
    );

    const newState = staffReducer(initialState, {
      type: fetchStaffs.fulfilled.type,
      payload: result.payload,
    });

    expect(newState.staffList).toEqual(mockData);
    expect(newState.loading).toBe(false);
    expect(newState.status).toBe('idle');
    expect(newState.error).toBe(null);
  });

  it('should handle fetchStaffs.rejected', async () => {
    mockedAxios.get.mockRejectedValue({
      response: { data: { message: 'Failed to fetch staff' } },
    });

    const result = await fetchStaffs()(
      jest.fn(),
      () => initialState,
      undefined,
    );

    const newState = staffReducer(initialState, {
      type: fetchStaffs.rejected.type,
      payload: result.payload,
    });

    expect(newState.error).toBe('Failed to fetch staff');
    expect(newState.status).toBe('error');
    expect(newState.loading).toBe(false);
  });

  it('should handle fetchStaffs.pending', () => {
    const newState = staffReducer(initialState, {
      type: fetchStaffs.pending.type,
    });

    expect(newState.loading).toBe(true);
  });

  it('should handle createStaff.fulfilled', async () => {
    const newStaff = {
      full_name: 'David',
      email: 'david@example.com',
      phone_number: '1234567890',
      shift_id: 3,
      staffs_role: 'Chef',
    };

    mockedAxios.post.mockResolvedValue({ data: { data: newStaff } });

    const result = await createStaff(newStaff)(
      jest.fn(),
      () => initialState,
      undefined,
    );

    const newState = staffReducer(initialState, {
      type: createStaff.fulfilled.type,
      payload: result.payload,
    });

    expect(newState.staffList).toContainEqual(newStaff);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });

  it('should handle createStaff.rejected', async () => {
    mockedAxios.post.mockRejectedValue({
      response: { data: { message: 'Failed to create staff' } },
    });

    const result = await createStaff({
      full_name: 'David',
      email: 'david@example.com',
      phone_number: '1234567890',
      shift_id: 3,
      staffs_role: 'Chef',
    })(jest.fn(), () => initialState, undefined);

    const newState = staffReducer(initialState, {
      type: createStaff.rejected.type,
      payload: result.payload,
    });

    expect(newState.error).toBe('Failed to create staff');
    expect(newState.status).toBe('error');
  });

  it('should handle createStaff.pending', () => {
    const newState = staffReducer(initialState, {
      type: createStaff.pending.type,
    });

    expect(newState.loading).toBe(true);
  });

  it('should handle updateStaffData.fulfilled', async () => {
    initialState.staffList = [
      { id: 1, full_name: 'John', email :'john@gmail.com', phone_number: '1234567890', staffs_role: 'Waiter' },
      { id: 2, name: 'Alice', email :'alice@gmail.com', phone_number: '1234567890', staffs_role: 'Waiter' },
    ];

    const updated = { id:2,full_name: 'David', email: "david@example.com", phone_number: '1234567890', shift_id:3, staffs_role: 'Chef' };

    mockedAxios.put.mockResolvedValue({ data: { data: updated } });

    const result = await updateStaffData({ id: 2, data: updated })(
      jest.fn(),
      () => initialState,
      undefined,
    );

    const newState = staffReducer(initialState, {
      type: updateStaffData.fulfilled.type,
      payload: result.payload,
    });

    expect(newState.staffList[1]).toEqual(updated);
    expect(newState.error).toBe(null);
  });

  it('should handle updateStaffData.rejected', async () => {
    mockedAxios.put.mockRejectedValue({
      response: { data: { message: 'Failed to update staff' } },
    });

    const result = await updateStaffData({ id: 1, data: { full_name: 'David', email: "david@example.com", phone_number: '1234567890', shift_id:3, staffs_role: 'Chef' } })(
      jest.fn(),
      () => initialState,
      undefined,
    );

    const newState = staffReducer(initialState, {
      type: updateStaffData.rejected.type,
      payload: result.payload,
    });

    expect(newState.error).toBe('Failed to update staff');
  });

  it('should handle updateStaffData.pending', () => {
    const newState = staffReducer(initialState, {
      type: updateStaffData.pending.type,
    });

    expect(newState.loading).toBe(true);
  });

  it('should handle deleteStaffData.fulfilled', async () => {
    initialState.staffList = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Alice' },
    ];

    mockedAxios.delete.mockResolvedValue({});

    const result = await deleteStaffData({ id: 1 })(
      jest.fn(),
      () => initialState,
      undefined,
    );

    const newState = staffReducer(initialState, {
      type: deleteStaffData.fulfilled.type,
      payload: result.payload,
    });

    expect(newState.staffList).toEqual([{ id: 2, name: 'Alice' }]);
  });

  it('should handle deleteStaffData.rejected', async () => {
    mockedAxios.delete.mockRejectedValue({
      response: { data: { message: 'Failed to delete staff' } },
    });

    const result = await deleteStaffData({ id: 999 })(
      jest.fn(),
      () => initialState,
      undefined,
    );

    const newState = staffReducer(initialState, {
      type: deleteStaffData.rejected.type,
      payload: result.payload,
    });

    expect(newState.error).toBe('Failed to delete staff');
    expect(newState.status).toBe('error');
  });

  it('should handle deleteStaffData.pending', () => {
    const newState = staffReducer(initialState, {
      type: deleteStaffData.pending.type,
    });

    expect(newState.loading).toBe(true);
  });

  it('should clear staff error', () => {
    initialState.error = 'Oops!';

    const newState = staffReducer(initialState, clearStaffError());

    expect(newState.error).toBe(null);
  });
});
