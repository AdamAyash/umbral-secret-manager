import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    private readonly _router: Router = inject(Router);
    private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

    private readonly _items: WritableSignal<MenuItem[]> = signal<MenuItem[]>([]);

    public constructor() {
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => this.update());
    }

    public getBreadCrumbs(): MenuItem[] {
        return this._items();
    }

    private update(): void {
        const items: MenuItem[] = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: '/dashboard'
            }
        ];

        let route = this._activatedRoute;
        let url = '';

        while (route.firstChild) {
            route = route.firstChild;

            const urlSegment = route.snapshot.url
                .map(segment => segment.path)
                .join('/');

            if (urlSegment) {
                url += `/${urlSegment}`;
            }

            const breadcrumb = route.snapshot.data['breadcrumb'];

            if (breadcrumb) {
                items.push({
                    label: breadcrumb,
                    routerLink: url
                });
            }
        }

        this._items.set(items);
    }
}