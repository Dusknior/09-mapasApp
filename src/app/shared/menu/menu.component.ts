import { Component } from '@angular/core';

interface MenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Full Screen',
      route: '/mapas/full-screen',
    },
    {
      label: 'Zoom Range',
      route: '/mapas/zoom-range',
    },
    {
      label: 'Marcadores',
      route: '/mapas/marcadores',
    },
    {
      label: 'Propiedades',
      route: '/mapas/propiedades',
    },
  ];
}
