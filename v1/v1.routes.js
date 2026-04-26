import express from 'express';
import {authenticateToken} from './middlewares/authenticate.middleware.js';
import authRouter from "./routes/auth.routes.js";
import ejercicioRouter from "./routes/ejercicios.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import desafiosRouter from "./routes/desafios.routes.js";
import categoriaZonaMuscularRouter from "./routes/categoriaZonaMuscular.routes.js";
import rutinasRouter from "./routes/rutinas.routes.js";
import productosRouter from "./routes/productos.routes.js";
import categoriaMusculosRoutes from "./routes/cateogiraMusculos.routes.js";
import desafioEjercicioRouter from "./routes/desafioEjercicio.routes.js";
import usuarioDesafiosRouter from "./routes/usuarioDesafios.routes.js";
import usuarioProductosRouter from "./routes/usuarioProductos.routes.js";
import rutinaEjercicioRouter from "./routes/rutinaEjercicio.router.js";
import wgerApiRouter from "./routes/wgerApi.routes.js";
import aiRouter from "./routes/ai.routes.js";

const router = express.Router({ mergeParams: true });

//rutas desprotegidas
router.use("/auth", authRouter);
router.use("/ai-consultas", aiRouter);
router.use(authenticateToken);

//rutas protegidas
router.use("/ejercicios", ejercicioRouter);
router.use("/usuarios", usuariosRouter);
router.use("/desafios", desafiosRouter);
router.use("/categoriasZonaMuscular", categoriaZonaMuscularRouter);
router.use("/rutinas", rutinasRouter);
router.use("/productos", productosRouter);
router.use("/categoriasMusculos", categoriaMusculosRoutes);

router.use("/desafio-ejercicios", desafioEjercicioRouter);
router.use("/usuario-desafios", usuarioDesafiosRouter);
router.use("/usuario-productos", usuarioProductosRouter);
router.use("/rutina-ejercicios", rutinaEjercicioRouter);
router.use("/wger-api", wgerApiRouter);


export default router; 

//DONE
//login
//rutas protegidas
//alta baja modificacion y eliminacion de colecciones

//Consultar:
//alta baja modificacion y consulta de documentos de categorias que sirva para asignar a las entidades del punto anterior, ej; gestion de rubro de comidas


//ToDo
//Roles con 2 roles Permisos diferentes.
//cambiar plan plus a premium, un perfil debe permitir cambiar de plus a premium, plus es por defecto, el otro usuario no gestiona planes
//altas solo para cuatro registros, usuarios plues e ilimitados para premium -- entidad a eleccion del equipo

//consultas paginadas para colecciones
//investigar endpoint que utiliza endpoint pertinente externo

//integracion de inteligancia artificial generativa
//subida de imagenes

