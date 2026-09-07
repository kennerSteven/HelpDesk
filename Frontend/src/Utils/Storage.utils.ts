export function GetStorageItem(key: string, defaultValue: any) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.log("No se pudo acceder al getStorageItem");
    return defaultValue;
  }
}

export function SetStorageItem(key: string, data: any) {
  try {
     localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
      return false;
  }
}
