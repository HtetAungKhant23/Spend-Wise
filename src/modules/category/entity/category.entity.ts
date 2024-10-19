export class CategoryEntity {
  name: string;

  icon: string;

  isPrivate: boolean;

  constructor(name: string, icon: string, isPrivate: boolean) {
    this.name = name;
    this.icon = icon;
    this.isPrivate = isPrivate;
  }
}
