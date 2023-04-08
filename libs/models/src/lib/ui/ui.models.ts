export interface ILogo {
  src: string;
  alt: string;
  href: string;
  name: string;
}

export interface IGoup {
  name: string;
  links: ILink[];
}

export interface ILink {
  href?: string;
  routerLink?: string;
  name: string;
}

export interface IIconLinks {
  href: string;
  icon: string;
  name: string;
}
