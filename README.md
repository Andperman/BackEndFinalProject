<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://www.sevillaemprendedora.org/wp-content/uploads/2024/03/The-Bridge.png" alt="Project logo"></a>
</p>

<h3 align="center">PROYECTO FINAL BACK-END. WEB DE PROYECTOS FREELANCE CON API EXPRESS</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="justify"> El objetivo de este proyecto ha sido el diseño y desarrollo de una web que integre un metabuscador de ofertas de trabajo para freelancers con webscraping y API REST, con modelo de datos SQL y MongoDB, además de diferentes métodos de autorización como google auth y JWT. También está presente la técnica de front end de SSR, o server-side rendering, implementada en este caso con plantillas dinamicas .pug
    <br> 
</p>

## 📝 ÍNDICE

- [Acerca de](#about)
- [Herramientas utilizadas](#built_using)
- [Implementaciones futuras](#implementacionesf)

- [Autoría](#authors)


##  Acerca de <a name = "about"></a>
#### El proyecto diferencia varias Fases:
<p align="justify">

- (Fase I): Creación de la arquitectura de archivos y carpetas del servidor con Express, siguiendo la estructura MVC(Modelo-Vista-Controlador), elementos conectados mediante rutas para peticiones http. También es importante destacar el despliegue del cluster Atlas de MongoDB, así como la BBDD SQL y la aplicación web en Render, garantizando así una correcta comunicación para el entorno de pruebas. 

- (Fase II): Construcción de API en Express. Se ha comenzado por el diseño del modelo de datos para la elaboración correcta del código JS de models. En este caso se ha elegido una base de datos SQL para todo lo relacionado con el usuario y sus anuncios marcados como favoritos, permitiendo escalabilidad, orden y homogeneidad en los datos. Para almacenar los datos de las ofertas que provienen de WebScraping (con puppeteer) se ha optado por usar MongoDB, considerándola una alternativa apropiada por su flexibilidad y rápida implementación en nuestro proyecto, ya que los proyectos freelancer que se almacenan provienen de diferentes fuentes, cada una con su estructura de datos específica. Se ha usado validación de campos con express-validator, RegEx y validación a nivel de ObjectSchema.


- (Fase III): UX/UI by role, Auth con Google, JWT y autenticación interna. Implementación y conexión correcta de toda la aplicación web:
En esta fase se ha planteado una comunicación total de todos los aspectos y archivos internos del proyecto, con diferentes diagramas de flujo de lo que puede o no hacer el usuario según su rol en la web (admin o user):
##### user: 
    Registro (Manual y Google), login, consulta y visualización de anuncios de proyecto, marcar y desmarcar como favorito un anuncio concreto, editar su info de usuario(Profile)

##### admin (/dashboard): 
    Registro (Manual y Google), login, consulta y visualización de anuncios de proyecto, marcar y desmarcar como favorito un anuncio concreto, editar info de usuarios(Profile), editar users y borrarlos, crear ofertas de proyecto, cargar nuevas ofertas a la BBDD de MongoDB (sin duplicados)
</p>



## ⛏️ Herramientas utilizadas <a name = "built_using"></a>


- Trello
- GitHub
- Maquetación CSS, Mobile first
- Morgan
- Swagger
- Despliegue Render y cluster MongoDB(Atlas)
- Web Scraping con puppeteer
- Front end con PUG
- Express
- MongoDB
- PostgreSQL
- MVC
- API REST
- autenticación con JWT user + password
- autenticación con Google



## Mejoras futuras: <a name = "implementacionesf"></a>

- Testing: Testear 2 endpoints
- Documentación de código (JSDoc)
- Login de usuarios
- Editar ofertas desde la vista del admin (Ya implementado en el CRUD)
- Editar usuarios desde la vista del admin (Ya implementado en el CRUD)
- Maquetar con CSS el pug para errores







## ✍️ Autoría <a name = "authors"></a>
- Deydre Alonso (https://github.com/Deydre)
- Andrea Pérez (https://github.com/Andperman)
- Víctor Garritano (https://github.com/vgarri)
