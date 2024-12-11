import {BaseEntity} from "./base-entity.model";
import {TreeNode} from "../services/core/route.service";

export interface RoleAccess extends BaseEntity  {

  role?:string;
  access?:TreeNode[];

}
