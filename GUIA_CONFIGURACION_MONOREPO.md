# 📦 Guía Práctica: Arquitectura Monorepo con NPM Workspaces

Esta guía documenta la solución implementada para compartir esquemas de validación (**Zod**) y tipos entre múltiples aplicaciones (**Backend con Express** y **Frontend con React/Vite**), además de explicar cómo replicar esta arquitectura desde cero en futuros proyectos.

---

## 1. ¿Qué se hizo en este proyecto?

### 🔴 El Problema Inicial
La estructura del proyecto contenía aplicaciones dentro de `apps/` y paquetes compartidos dentro de `packages/`:
```text
Practica react/
├── apps/
│   ├── backend/
│   └── frontend/
└── packages/
    └── schemas/
```

Para usar los esquemas desde `apps/backend/Src/Routes/task.routes.ts`, se dependía de rutas relativas largas y frágiles:
```typescript
// ❌ Frágil, difícil de mantener si el archivo se mueve
import { CreateTaskSchema } from "../../../../packages/schemas/Task.schema";
```

### 🟢 La Solución Implementada
Se convirtió el proyecto en un **Monorepo gestionado por NPM Workspaces**. Gracias a esto, `packages/schemas` ahora se comporta como una librería instalada dentro del ecosistema del proyecto:
```typescript
// ✅ Limpio, mantenible y con autocompletado nativo
import { CreateTaskSchema } from "@repo/schemas";
```

---

## 2. Cambios técnicos realizados en este proyecto

1. **Creación del `package.json` en la raíz (`/package.json`):**
   Declara qué carpetas formarán parte del espacio de trabajo compartido (`apps/*` y `packages/*`).
2. **Definición del paquete `@repo/schemas` (`packages/schemas/package.json`):**
   Define el nombre del paquete interno, sus puntos de entrada (`main`, `types`, `exports`) y su compatibilidad con Zod.
3. **Punto de entrada único (`packages/schemas/index.ts`):**
   Centraliza y exporta todos los archivos de esquemas (`Task`, `Category`, `login`).
4. **Vinculación de dependencias en Backend y Frontend:**
   Se añadió `"@repo/schemas": "*"` dentro de las `dependencies` de `apps/backend/package.json` y `apps/frontend/package.json`.
5. **Ejecución de `npm install` en la raíz:**
   NPM resolvió los enlaces simbólicos (*symlinks*) en los `node_modules` de cada app hacia la carpeta local `packages/schemas`.
6. **Correcciones de soporte aplicadas:**
   * **Orden de middleware en `apps/backend/app.ts`:** Se aseguró que `app.use(express.json())` se ejecute **antes** de `app.use("/api/tasks", taskRoutes)` para que `req.body` esté disponible durante la validación de Zod.
   * **Tipado en `apps/backend/Src/Middleware/Validate.middleware.ts`:** Se actualizó el tipado a `ZodType` importado de `zod`.
   * **Actualización en Frontend:** Se actualizaron los 4 componentes (`CreateNewUser`, `Login`, `CreateCategory`, `CreateTask`) para consumir `@repo/schemas`.

---

## 3. Guía Paso a Paso: ¿Cómo hacerlo tú mismo desde cero?

Sigue estos 5 pasos exactos en cualquier proyecto donde quieras compartir código entre Frontend y Backend:

### Paso 1: Estructurar tus carpetas
Crea la siguiente jerarquía en tu proyecto:
```text
mi-proyecto/
├── apps/
│   ├── backend/
│   └── frontend/
├── packages/
│   └── schemas/
└── package.json    <-- (Archivo raíz que crearemos en el Paso 2)
```

---

### Paso 2: Crear el `package.json` en la raíz
En la carpeta principal (`mi-proyecto/package.json`), crea un archivo indicando los **workspaces**:

```json
{
  "name": "mi-proyecto-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```
> **Nota:** `"private": true` es una protección para evitar que por accidente intentes publicar la raíz en el registro público de NPM.

---

### Paso 3: Configurar el paquete compartido (`packages/schemas`)
Dentro de la carpeta `packages/schemas/`:

1. Crea su propio `package.json`:
   ```json
   {
     "name": "@repo/schemas",
     "version": "1.0.0",
     "private": true,
     "main": "./index.ts",
     "types": "./index.ts",
     "exports": {
       ".": {
         "types": "./index.ts",
         "import": "./index.ts",
         "require": "./index.ts",
         "default": "./index.ts"
       }
     },
     "peerDependencies": {
       "zod": "*"
     }
   }
   ```

2. Crea el archivo `index.ts` que exporta todo:
   ```typescript
   // packages/schemas/index.ts
   export * from "./Task.schema";
   export * from "./Category.schema";
   export * from "./login.schema";
   ```

---

### Paso 4: Consumir el paquete en tus aplicaciones

#### En `apps/backend/package.json`:
Añade `@repo/schemas` a tus dependencias:
```json
"dependencies": {
  "express": "^5.2.1",
  "zod": "^4.5.4",
  "@repo/schemas": "*"
}
```

#### En `apps/frontend/package.json`:
Añade `@repo/schemas` a tus dependencias:
```json
"dependencies": {
  "react": "^19.2.8",
  "zod": "^4.4.3",
  "@repo/schemas": "*"
}
```

> El comodín `"*"` le indica a NPM que use la versión local disponible en el workspace.

---

### Paso 5: Instalar y Vincular
Abre la terminal en la **raíz del proyecto** (donde está el primer `package.json`) y corre:

```bash
npm install
```

NPM leerá los workspaces, creará los accesos directos (*symlinks*) y a partir de ese momento podrás importar directamente:

```typescript
// En cualquier parte de backend o frontend:
import { CreateTaskSchema, type CreateTaskSchemaType } from "@repo/schemas";
```

---

## 4. Ventajas de esta configuración

* 🔄 **Fuente única de la verdad (DRY):** Si cambias una validación (ej. el nombre de una tarea ahora debe tener mínimo 3 caracteres), el cambio impacta de inmediato en el formulario del Frontend y en la validación del Backend.
* ⚡ **Sin pasos de compilación manuales:** Con herramientas modernas como `Vite` en frontend y `tsx` en backend, los archivos TypeScript compartidos se leen y ejecutan en tiempo real.
* 📦 **Un solo comando:** Con ejecutar `npm install` en la raíz, se configuran e instalan todas las librerías del backend, frontend y paquetes internos.
