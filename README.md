# ApsicolFrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) 

Si se genera un error con el devkit debe agregarse el modulo localmente:
https://www.npmjs.com/package/@angular-devkit/build-angular
-->npm install --save-dev @angular-devkit/build-angular@15.2.0
*tener presente la versión del angular 15.2.0

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

----------------------cambios desarrollo-------------------------------------

# Instalacion Angular 15
- 1. Instalar Angular Cli V15
--> npm install -g @angular/cli@15.2.0

- 2. Crear el proyecto de Angular 15.2.0
--> ng new (Nombre del proyecto)

- 3. Ejecutar servidor front end
--> ng s --o

# Instalar componentes
- ng g c (ruta carpeta de componentes)/(mombre componente)
- ng g c components/administrador

# Instalar servicios
- ng g s (ruta carpeta de servicios)/(mombre servicio)
- ng g s services/administrador

# Instalar libreria de bootstrap 5
- npm i bootstrap
en el archivo style.css padre se agrega bootstrap
@import "~bootstrap/dist/css/bootstrap.css"
- convertir y agregar el icono del proyecto https://favicon.io/

# ruta apsicol viejita
http://localhost/apsicol/index.php?controller=inicio&action=index

# Desplegar proyecto a gitHub pages
https://www.youtube.com/watch?v=lM4A6SBK1uQ&ab_channel=bladimir.dev.

ng deploy --base-href=https://edriball121.github.io/Apsicol-front-end
