import { useNavigate } from "react-router-dom";
import ProductItem from "../../view/templates/product";

function ProductItems({ products }) {
  const navigate = useNavigate();

  return (
    <div className="product-items">
      {products.length === 0 ? (
        <p className="no-data">Belum ada produk.</p>
      ) : (
        products.map((item) => (
          <div 
            key={item.id} 
            onClick={() => navigate(`/produk/${item.id}`, { state: { productData: item } })}
            style={{ cursor: "pointer", display: "block" }}
          >
            <ProductItem
              namaProduk={item.namaProduk}
              ukuranProduk={item.ukuranProduk}
              ukuranSatuan={item.ukuranSatuan}
              kemasanProduk={item.kemasanProduk}
              imageProduk={item.imageProduk}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default ProductItems;
