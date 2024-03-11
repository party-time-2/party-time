export interface ILogo {
  src: string | undefined;
  alt: string | undefined;
  href: string | undefined;
  name: string | undefined;
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
