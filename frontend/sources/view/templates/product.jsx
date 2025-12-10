function ProductItem({ namaProduk, ukuranProduk, ukuranSatuan, imageProduk }) {
  return (
    <div className="product">
      <img src={imageProduk} alt={namaProduk} />
      <div className="product-desc">
        <p>
          {namaProduk}<br/><br/>
          {ukuranProduk}{ukuranSatuan}
        </p>
      </div>
    </div>
  );
}

export default ProductItem;