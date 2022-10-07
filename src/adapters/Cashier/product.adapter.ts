export const createProductAdapter = (product: any) => ({
  id: product.id,
  nombre: product.nombre,
  precio: product.precio,
  costoPuntos: product.costoPuntos,
  puntosRecompensa: product.puntosRecompensa,
  descripcion: product.descripcion
});
  
