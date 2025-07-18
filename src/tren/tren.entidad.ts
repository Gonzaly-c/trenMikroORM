import { Entity, Property } from "@mikro-orm/core";
import { EntidadBase } from "../shared/db/entidadBase.entidad.js";

@Entity()
export class Tren extends EntidadBase {
  @Property({nullable: false})
  color!: string

  @Property({nullable: false})
  modelo!: string

}
