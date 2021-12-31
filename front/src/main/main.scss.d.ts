declare namespace MainScssNamespace {
  export interface IMainScss {
    active: string;
    btn: string;
    "btn-check": string;
    "btn-danger": string;
    "btn-dark": string;
    "btn-group": string;
    "btn-group-lg": string;
    "btn-group-sm": string;
    "btn-group-vertical": string;
    "btn-info": string;
    "btn-lg": string;
    "btn-light": string;
    "btn-link": string;
    "btn-outline-danger": string;
    "btn-outline-dark": string;
    "btn-outline-info": string;
    "btn-outline-light": string;
    "btn-outline-primary": string;
    "btn-outline-secondary": string;
    "btn-outline-success": string;
    "btn-outline-warning": string;
    "btn-primary": string;
    "btn-secondary": string;
    "btn-sm": string;
    "btn-success": string;
    "btn-toolbar": string;
    "btn-warning": string;
    disabled: string;
    "dropdown-toggle": string;
    "dropdown-toggle-split": string;
    dropend: string;
    dropstart: string;
    dropup: string;
    "input-group": string;
    show: string;
  }
}

declare const MainScssModule: MainScssNamespace.IMainScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainScssNamespace.IMainScss;
};

export = MainScssModule;
