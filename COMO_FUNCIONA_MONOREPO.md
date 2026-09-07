# 💡 ¿Cómo Funciona este Monorepo? (Explicación Fácil y Directa)

Este documento reúne las dos dudas principales resueltas: cómo sabe cada proyecto dónde están las librerías y cómo se configuró el paquete `@repo/schemas`.

---

## 🚪 Parte 1: ¿Cómo sabe el Front y el Back dónde está el `node_modules`?

### La regla de oro
En JavaScript y Node.js, cuando importas una librería sin poner `./` ni `../` (por ejemplo: `import express from "express"` o `import { ... } from "@repo/schemas"`):

> **Si la librería no está en la carpeta actual de tu proyecto, Node.js y Vite automáticamente salen a buscarla a la carpeta de afuera.**

### La analogía de la vida real:
Imagina que estás en tu **habitación** y necesitas una tijera:
1. Primero miras en tu habitación (`apps/backend`).
2. Si no está ahí, **sales a la sala de la casa** (la carpeta raíz).
3. En la sala encuentras la caja de herramientas (`node_modules`) y la usas.

**No tuviste que enseñarle a nadie dónde está la sala.** Node.js y Vite ya vienen programados de fábrica para que, si no encuentran una librería en su propia carpeta, **salgan a revisar la carpeta de afuera**.

Por eso el Backend y el Frontend encuentran el `node_modules` de la raíz sin tener que configurar ninguna ruta manual.

---

## 🛠️ Parte 2: ¿Cómo se configuró `@repo/schemas`?

Configurar `@repo/schemas` para que funcionara como una librería propia requirió **3 pasos**:

### Paso 1: "Bautizar" la carpeta con un nombre
Fuimos a la carpeta `packages/schemas` y creamos un archivo `package.json` para darle una identidad:

```json
{
  "name": "@repo/schemas",
  "version": "1.0.0",
  "main": "./index.ts",
  "types": "./index.ts"
}
```
*(El prefijo `@repo/` es solo una convención para indicar que es un paquete interno de tu repositorio. Podrías haberle puesto `@miapp/schemas` o simplemente `schemas`)*.

---

### Paso 2: Crear la "puerta de salida" (`index.ts`)
Dentro de `packages/schemas/` creamos un archivo llamado `index.ts`. Este archivo sirve como el **menú principal** que expone todo lo que hay dentro de la carpeta:

```typescript
// packages/schemas/index.ts
export * from "./Task.schema";
export * from "./Category.schema";
export * from "./login.schema";
```
*(Así, cuando alguien llame a `@repo/schemas`, este archivo le entrega todos los esquemas de una vez)*.

---

### Paso 3: Pedirlo en el Backend y en el Frontend
Fuimos al `package.json` del **Backend** (`apps/backend/package.json`) y del **Frontend** (`apps/frontend/package.json`) y lo agregamos en sus dependencias como si fuera una librería instalada:

```json
"dependencies": {
  "@repo/schemas": "*"
}
```
*(El asterisco `"*"` le dice a NPM: "usa la versión local que encuentres en el proyecto")*.

---

### El paso final: `npm install`
Abrimos la terminal en la raíz y ejecutamos:

```bash
npm install
```

Al ver que en la raíz existía la regla `"workspaces": ["packages/*"]`, NPM dijo:
> *"El backend y el frontend me están pidiendo `@repo/schemas`. No voy a ir a internet a buscarlo, voy a conectar directamente la carpeta local `packages/schemas`."*

---

## 🚀 Resultado Final

Ahora puedes usar tus esquemas en cualquier archivo del Backend o del Frontend con una sola línea limpia:

```typescript
import { CreateTaskSchema } from "@repo/schemas";
```
