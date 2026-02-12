import { useNavigate } from "react-router-dom";
import ProductItem from "../../view/templates/product";
import { useTranslation } from "../../contexts/localContext";

function ProductItems({ products }) {
  const navigate = useNavigate();
  const t = useTranslation();

  return (
    <div className="product-items">
      {products.length === 0 ? (
        <p className="no-data">{t('noProducts')}</p>
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
