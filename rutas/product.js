const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./productos.txt";
  }

  static id = 0;

  writeProducts = async (productos) => {
    await fs.writeFile(this.path, JSON.stringify(productos), (error) => {
      if (error) throw error;
    });
  };

  readProducts = async () => {
    const allProducts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(allProducts);
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    ProductManager.id++;
    this.products.push({
      ...newProduct,
      id: ProductManager.id,
    });

    await this.writeProducts(this.products);
  };

  getProducts = async () => {
    let productsAll = await this.readProducts();
    //console.log(productsAll);
  };

  exist = async (id) => {
    let productsAll = await this.readProducts();
    return productsAll.find((product) => product.id === id);
  };

  getProductsById = async (id) => {
    (await this.exist(id))
      ? console.log(await this.exist(id))
      : console.log("NOT FOUND");
  };

  updateProduct = async ({ id, ...produt }) => {
    if ((await this.deleteProducts(id)) === false) {
      console.log("El Producto que intenta modificar no existe");
    } else {
      let prod = await this.readProducts();
      let modifiedProducts = [
        {
          id: id,
          ...produt,
        },
        ...prod,
      ];
      await this.writeProducts(modifiedProducts);
      console.log("Producto modificado Correctamente");
    }
  };
  deleteProducts = async (id) => {
    if (await this.exist(id)) {
      let products = await this.readProducts();
      let filterProducts = products.filter((prod) => prod.id != id);
      await this.writeProducts(filterProducts);
    } else {
      console.log("NOT FOUND");
      return false;
    }
  };
}

module.exports = { ProductManager };
const productos = new ProductManager();

productos.addProduct("puma", "azules", 120, 121, 121, 14, 422);

productos.addProduct("nike", "blancas", 130, 121, 121, 122, 712);

productos.addProduct("vans", "grises", 140, 121, 121, 112, 412);

productos.addProduct("rebook", "moradas", 150, 121, 111, 12, 642);

productos.addProduct("converse", "rosa", 160, 121, 141, 12, 712);

productos.addProduct("cariuma", "negras", 170, 121, 16, 12, 62);

productos.addProduct("puma", "marron", 180, 121, 121, 72, 512);

productos.addProduct("puma", "celeste", 290, 121, 121, 82, 412);

productos.addProduct("adidas", "marron", 380, 121, 121, 72, 312);

productos.addProduct("vas", "celeste", 490, 121, 121, 512, 112);
