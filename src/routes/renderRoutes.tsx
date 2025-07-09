import { Route } from 'react-router-dom';

export function renderRoutes(routeList: any[]) {
  return routeList.map(({ path, element, children, index }, idx) => (
    <Route key={idx} {...{ path, element, index }}>
      {children ? renderRoutes(children) : null}
    </Route>
  ));
}
