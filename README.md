EL frontend es una Aplicación de Página Única (SPA) construida con React y empaquetada con Vite. Su función principal es proporcionar una interfaz de usuario para interactuar con la API REST de tu backend, permitiendo a los usuarios gestionar clientes, productos y ventas de forma visual e interactiva.

Estructura del Frontend

# 1. main.jsx (Punto de Entrada)

Propósito: Es el archivo que inicia toda la aplicación. Renderiza el componente principal (App) en el index.html y envuelve la aplicación con BrowserRouter de react-router-dom para habilitar la navegación entre páginas.

# 2. App.jsx (Enrutador Principal)

Propósito: Define la estructura de las rutas de la aplicación. Utiliza el componente Layout.jsx para mantener una apariencia consistente (la barra de navegación) en todas las páginas.
Rutas: Mapea las URLs (/clientes, /productos, /ventas) a sus componentes de página correspondientes (ClientesPage.jsx, ProductosPage.jsx, VentasPage.jsx).

# 3. pages/ (Páginas de la Aplicación)

Propósito: Contiene los componentes que representan una página completa o una vista principal de una entidad.

Archivos:
* ClientesPage.jsx: Gestiona toda la lógica para la sección de clientes: obtiene la lista de clientes, maneja la búsqueda, y coordina la creación, edición y eliminación a través de modales.
* ProductosPage.jsx: Funcionalidad similar a la página de clientes, pero para la gestión de productos.
* VentasPage.jsx: Muestra el historial de ventas y permite registrar nuevas ventas.

# 4. components/ (Componentes Reutilizables)

Propósito: Contiene componentes de UI que se utilizan en varias partes de la aplicación. Esto promueve la reutilización de código y la consistencia.

Archivos:
* Layout.jsx: Define la estructura base con la barra de navegación y un Outlet donde se renderizan las páginas.
* ClienteForm.jsx, ProductoForm.jsx, VentaForm.jsx: Formularios para crear o editar datos y reutilizados dentro de los modales.
* Modal.jsx: Un componente genérico para mostrar contenido en una ventana emergente (modal), usado para los formularios y las confirmaciones de eliminación.
* Alert.jsx: Muestra notificaciones de éxito o error que desaparecen automáticamente.

# 5. api/ (Capa de Comunicación con el Backend)

Propósito: Abstrae toda la lógica de las llamadas a la API. Los componentes de las páginas no hacen llamadas HTTP directamente, sino que usan las funciones de esta capa.

Archivos:
* axiosConfig.js: Configura una instancia de axios con la URL base del backend (http://localhost:8080/api). # Esto es fundamental para no tener que repetir la URL en cada llamada.
* clienteService.js, productoService.js, ventaService.js: Cada archivo exporta funciones que corresponden a los endpoints de la API para cada entidad.
