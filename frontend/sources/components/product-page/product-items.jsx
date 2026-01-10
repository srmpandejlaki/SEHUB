import { Link } from "react-router-dom";
import ProductItem from "../../view/templates/product";

function ProductItems({ products }) {
  return (
    <div className="product-items">
      {products.length === 0 ? (
        <p className="no-data">Belum ada produk.</p>
      ) : (
        products.map((item) => (
          <Link 
            key={item.id} 
            to={`/produk/${item.id}`} 
            state={{ productData: item }}
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <ProductItem
              namaProduk={item.namaProduk}
              ukuranProduk={item.ukuranProduk}
              ukuranSatuan={item.ukuranSatuan}
              kemasanProduk={item.kemasanProduk}
              imageProduk={item.imageProduk}
            />
          </Link>
        ))
      )}
    </div>
  );
}

export default ProductItems;
