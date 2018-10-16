export interface SideNavMenuItem {
  name: string;
  index?: number;
  category?: boolean;
  icon?: string;
  route?: string;
  active?: boolean;
  routes?: Array<SideNavMenuItemRoutes>;
}

export interface SideNavMenuItemRoutes {
  name: string;
  route: string;
  active?: boolean;
}
