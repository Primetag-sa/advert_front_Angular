import { Component } from '@angular/core';
import {Input} from "@angular/core";
import {OnInit} from "@angular/core";
import {TreeNode} from "../../services/core/route.service";
import {Observable,map, filter} from "rxjs";
import {RoleAccess} from "../../models/role-access.model";
import {Store} from "@ngrx/store"
import {selectEntityList} from "../../store/crud/crud.selectors";
import * as CrudActions from "../../store/crud/crud.actions";
@Component({
  selector: 'app-route-tree',
  templateUrl: './route-tree.component.html',
  styleUrl: './route-tree.component.scss'
})
export class RouteTreeComponent implements OnInit{
  @Input() role: any = null;
  role_access$: Observable<RoleAccess[]> | undefined;
  id: string|number|undefined|null=null;
  // État de l'expansion des nœuds
  expanded: { [key: string]: boolean } = {};
  constructor(private store:Store) {

  }

  ngOnInit(){

    this.role_access$=this.store.select(selectEntityList('role_access'))
    // Subscribe to the role_access observable and filter based on the role
    this.role_access$.pipe(
      filter(role_access => !!role_access), // Ensure that role_access is not undefined or null
      map(role_access => {
        return role_access.filter((roleAccess) => roleAccess.role === this.role.role);
      })
    ).subscribe((filteredRoleAccess) => {

      if( filteredRoleAccess?.length>0)
      {
        const access = JSON.parse(JSON.parse(JSON.stringify(filteredRoleAccess[0]?.access))) || [];
        const rolesAccess = this.role.access || [];


        rolesAccess.forEach((roleAccess: any) => {
          if (!access.some((item: any) => item.id === roleAccess.id)) {
            access.push(roleAccess); // Ajoutez l'élément manquant
          }
        });


        console.log('Updated access:', access);



        this.role.access=access
        this.id=filteredRoleAccess[0].id
      }
    });

  }

  // Gérer l'expansion ou la fermeture d'un nœud
  toggleExpand(node: TreeNode): void {
    node.expanded = !node.expanded;
  }

  // Gérer la sélection d'un nœud via la checkbox
  toggleSelect(node: TreeNode): void {
    const newSelectedState = !node.selected; // Inverser l'état de sélection actuel
    node.selected = newSelectedState;
    node.indeterminate = false;

    // Si un nœud parent est sélectionné/désélectionné, appliquer la sélection descendante aux enfants
    if (node.children) {
      this.setChildrenSelection(node, newSelectedState);
    }

    // Après la modification de l'état des enfants, il faut vérifier les parents pour une sélection partielle
    this.updateParentSelection();

    if(this.id)
    {
        this.store.dispatch(CrudActions.update({
          entity: 'role_access',
          id: this.id,
          data: {
            role: this.role.role,
            access: JSON.stringify(this.role.access)

          }
        }))
    }else{
      this.store.dispatch(CrudActions.create({
        entity: 'role_access' ,
        data:{
          role:this.role.role,
          access:JSON.stringify(this.role.access),
        }
      }))
    }


  }

  // Appliquer la sélection aux enfants récursivement
  setChildrenSelection(node: TreeNode, isSelected: boolean): void {
    node.children?.forEach(child => {
      child.selected = isSelected;
      child.indeterminate = false;  // Désactiver l'état indéterminé pour les enfants
      if (child.children) {
        this.setChildrenSelection(child, isSelected);
      }
    });
  }

  // Mettre à jour la sélection du parent en fonction de l'état de ses enfants (sélection partielle)
  updateParentSelection(): void {
    this.role.access.forEach((node:any) => this.updateNodeState(node));
  }

  // Mettre à jour récursivement l'état d'un nœud parent en fonction de ses enfants
  updateNodeState(node: TreeNode): void {
    if (node.children && node.children.length > 0) {
      const allSelected = node.children.every(child => child.selected);
      const someSelected = node.children.some(child => child.selected || child.indeterminate);
      node.selected = allSelected;
      node.indeterminate = !allSelected && someSelected;
      node.children.forEach(child => this.updateNodeState(child));
    }
  }


}

