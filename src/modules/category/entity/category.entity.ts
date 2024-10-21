export class CategoryEntity {
  id: string;

  name: string;

  icon: string;

  isPrivate: boolean;

  constructor(id: string, name: string, icon: string, isPrivate: boolean) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.isPrivate = isPrivate;
  }
}
