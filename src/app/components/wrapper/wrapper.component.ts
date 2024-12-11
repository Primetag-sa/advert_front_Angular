import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import { Store } from '@ngrx/store';
import {Observable} from "rxjs";
import {selectAuthenticatedUser} from "../../store/auth/auth.selectors";
import * as authActions from "../../store/auth/auth.actions";
import {User} from "../../models/user.model";
import {RoleComponentService} from "../../services/core/role.component.service";


@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss'
})
export class WrapperComponent implements OnInit {
  user$:Observable<User|null>
  currentUser:User|null=null
  constructor(
    private store: Store,
    private roleComponentService: RoleComponentService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute
  ) {
    this.user$=this.store.select(selectAuthenticatedUser)

    this.user$.subscribe((user)=>{
      this.currentUser=user
    })
  }
  getRoutePattern(route: ActivatedRoute): string {
    let routePattern = '';
    let currentRoute: ActivatedRoute | null = route;

    while (currentRoute) {
      const snapshot = currentRoute.snapshot;
      const urlSegments = snapshot.url;

      // Remplacer les segments avec des valeurs réelles par leurs paramètres correspondants
      const patternSegments = urlSegments.map((segment: UrlSegment) => {
        // Vérifier si le segment correspond à un paramètre dynamique
        const matchingParam = Object.keys(snapshot.params).find(
          param => snapshot.params[param] === segment.path
        );

        return matchingParam ? `:${matchingParam}` : segment.path;
      });
        if(patternSegments.length>0)
          routePattern = `${patternSegments.join('/')}/${routePattern}`;

      currentRoute = currentRoute.parent;
    }

    // Nettoyer les doubles barres obliques et les barres obliques finales
    return routePattern.replace(/\/+/g, '/').replace(/\/$/, '');
  }

  ngOnInit(): void {
    const userRole:string|null|undefined = this.currentUser?.role; // Obtenir le rôle de l'utilisateur (agent ou admin)
    const currentPath = this.getRoutePattern(this.route); // Obtenir le chemin complet



    // Obtenir le bon composant en fonction du rôle et du chemin
    const component = this.roleComponentService.getComponentForRoleAndPath(userRole, currentPath);

    if (component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component.component);
      this.viewContainerRef.clear(); // Effacer le contenu précédent
      this.viewContainerRef.createComponent(componentFactory); // Injecter dynamiquement le nouveau composant
    } else {
      console.error('Aucun composant correspondant trouvé pour ce rôle et ce chemin.');
    }
  }
}

