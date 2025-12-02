// A function reference that your App.web.tsx will inject
let globalWebNavigate: ((screen: string, params?: any) => void) | null = null;

// Minimal in-memory route state for web navigation
type WebRoute = {
  name: string;
  params?: any;
};

let currentRoute: WebRoute = { name: "Splash" };

export const setWebNavigate = (
  fn: (screen: string, params?: any) => void
): void => {
  globalWebNavigate = fn;
};

export const useNavigation = () => {
  return {
    navigate: (screen: string, params?: any) => {
      // Keep track of the last route so hooks like useRoute() can read it
      if (screen === "Main" && params?.screen) {
        currentRoute = { name: "Main", params };
      } else {
        currentRoute = { name: screen, params };
      }

      if (globalWebNavigate) {
        globalWebNavigate(screen, params);
      } else {
        console.warn(
          `Web navigation attempted before initialization (screen: ${screen})`
        );
      }
    },
  };
};

// Minimal implementation of useRoute for web
export const useRoute = () => {
  return currentRoute as any;
};

// Minimal implementation of getFocusedRouteNameFromRoute
export const getFocusedRouteNameFromRoute = (route: any): string | undefined => {
  if (!route) return undefined;
  if (route.params && typeof route.params.screen === "string") {
    return route.params.screen;
  }
  return route.name;
};

export const NavigationContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export const createStackNavigator = () => {
  return {
    Navigator: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Screen: () => null,
  };
};
