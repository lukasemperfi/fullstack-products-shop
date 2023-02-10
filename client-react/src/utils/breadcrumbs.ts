export class Breadcrumbs {
  constructor(public readonly breadcrumbName: string) {}

  public static createName(name: string) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    return new Breadcrumbs(capitalizedName);
  }
}
