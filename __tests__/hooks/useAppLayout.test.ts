import { renderHook } from '@testing-library/react-hooks';
import { Platform } from 'react-native';
import { useAppLayout } from '../../src/hooks/useAppLayout';

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
  useWindowDimensions: jest.fn(),
}));

describe('useAppLayout', () => {
  const mockUseWindowDimensions = require('react-native').useWindowDimensions;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Platform Detection', () => {
    it('should identify iOS platform', () => {
      Platform.OS = 'ios';
      mockUseWindowDimensions.mockReturnValue({ width: 375 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isios).toBe(true);
      expect(result.current.isWeb).toBe(false);
    });

    it('should identify Web platform', () => {
      Platform.OS = 'web';
      mockUseWindowDimensions.mockReturnValue({ width: 1440 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isWeb).toBe(true);
      expect(result.current.isios).toBe(false);
    });

    it('should identify Android platform', () => {
      Platform.OS = 'android';
      mockUseWindowDimensions.mockReturnValue({ width: 412 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isios).toBe(false);
      expect(result.current.isWeb).toBe(false);
    });
  });

  describe('Screen Size Detection - Mobile', () => {
    beforeEach(() => {
      Platform.OS = 'ios';
    });

    it('should identify mobile screen (width < 600)', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 375 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isMobile).toBe(true);
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isDesktop).toBe(false);
      expect(result.current.width).toBe(375);
    });

    it('should identify mobile at boundary (width = 599)', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 599 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isMobile).toBe(true);
      expect(result.current.isTablet).toBe(false);
    });
  });

  describe('Screen Size Detection - Tablet', () => {
    beforeEach(() => {
      Platform.OS = 'ios';
    });

    it('should identify tablet screen (600 <= width < 1024)', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 768 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isMobile).toBe(false);
      expect(result.current.isTablet).toBe(true);
      expect(result.current.isDesktop).toBe(false);
      expect(result.current.width).toBe(768);
    });

    it('should identify tablet at lower boundary (width = 600)', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 600 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isTablet).toBe(true);
      expect(result.current.isMobile).toBe(false);
    });

    it('should identify tablet at upper boundary (width = 1023)', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 1023 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isTablet).toBe(true);
      expect(result.current.isDesktop).toBe(false);
    });
  });

  describe('Screen Size Detection - Desktop', () => {
    it('should identify desktop on web (width >= 1024)', () => {
      Platform.OS = 'web';
      mockUseWindowDimensions.mockReturnValue({ width: 1440 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isMobile).toBe(false);
      expect(result.current.isTablet).toBe(false);
      expect(result.current.isDesktop).toBe(true);
      expect(result.current.width).toBe(1440);
    });

    it('should identify desktop at boundary (width = 1024)', () => {
      Platform.OS = 'web';
      mockUseWindowDimensions.mockReturnValue({ width: 1024 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isDesktop).toBe(true);
      expect(result.current.isTablet).toBe(false);
    });

    it('should NOT identify as desktop on mobile platform even with large width', () => {
      Platform.OS = 'ios';
      mockUseWindowDimensions.mockReturnValue({ width: 1440 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isDesktop).toBe(false);
      expect(result.current.isWeb).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very small screens', () => {
      Platform.OS = 'android';
      mockUseWindowDimensions.mockReturnValue({ width: 320 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isMobile).toBe(true);
      expect(result.current.width).toBe(320);
    });

    it('should handle very large screens on web', () => {
      Platform.OS = 'web';
      mockUseWindowDimensions.mockReturnValue({ width: 2560 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current.isDesktop).toBe(true);
      expect(result.current.width).toBe(2560);
    });

    it('should return all expected properties', () => {
      Platform.OS = 'web';
      mockUseWindowDimensions.mockReturnValue({ width: 1024 });

      const { result } = renderHook(() => useAppLayout());

      expect(result.current).toHaveProperty('width');
      expect(result.current).toHaveProperty('isWeb');
      expect(result.current).toHaveProperty('isDesktop');
      expect(result.current).toHaveProperty('isTablet');
      expect(result.current).toHaveProperty('isMobile');
      expect(result.current).toHaveProperty('isios');
    });
  });

  describe('Responsive Behavior', () => {
    it('should update when window dimensions change', () => {
      Platform.OS = 'web';
      mockUseWindowDimensions.mockReturnValue({ width: 375 });

      const { result, rerender } = renderHook(() => useAppLayout());

      expect(result.current.isMobile).toBe(true);
      expect(result.current.isDesktop).toBe(false);

      // Simulate window resize
      mockUseWindowDimensions.mockReturnValue({ width: 1440 });
      rerender();

      expect(result.current.isMobile).toBe(false);
      expect(result.current.isDesktop).toBe(true);
    });
  });
});