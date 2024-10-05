import db from "../models";
import data from "../data/data.json";

export const insertData = () =>
  new Promise(async (resolve, reject) => {
    try {
      for (const product of data) {
        // Tìm kiếm sản phẩm với điều kiện id_pr
        const [newProduct, created] = await db.Products.findOrCreate({
          where: { id_pr: product.Id_pr },
          defaults: {
            productName: product.ProductName,
            code_cat: product.Category,
            sub_cat: product.Subcategory,
            productColor: product.ProductColor,
            // Thêm các thuộc tính khác tại đây nếu cần
            descriptionProduct: product.DescriptionProduct,
            priceProduct: product.PriceProduct,
            soluong: product.Soluong,
            size: product.Size,
            styleFilter: product.Style,
            goWhere: product.Gowhere,
            eventFilter: product.Event,
          },
        });

        if (!created) {
          // Sản phẩm đã tồn tại, không cần thêm mới
          console.log(`Product with id_pr ${product.Id_pr} already exists.`);
        } else {
          // Sản phẩm mới được tạo thành công
          console.log(`Product with id_pr ${product.Id_pr} created.`);
        }
      }
      resolve("ok");
    } catch (error) {
      reject(error);
    }
  });
