import { useState } from "react";
import { useChangeCountBasketMutation, useDeleteInBasketMutation } from "../../store/api/apiBasket";

export default function BasketItem({ item }) {
  const [deleteInBasket] = useDeleteInBasketMutation();
  const [changeCount] = useChangeCountBasketMutation();

  return (
    <>
      <li>
        <div className="basket_product_imgs">
          <img
            onClick={() => deleteInBasket(item.id)}
            className="basket_product-cancel"
            src="/basket/icon-cancel.svg"
            alt=""
          />
          <div style={{width:54}}>
          <img className="basket_product-img"
            src={`/products/${item.name}.png`}
            alt=""
            style={{ maxWidth: 54, maxHeight: 54 }}
          />
          </div>
          
          <p>{item.name}</p>
        </div>
        <p className="basket_product_price">${Math.ceil(item.price*(1-item.discount/100))}</p>
        <div className="basket_product_quantity">
          <input
            type="text"
            value={item.count < 10 ? `0${item.count}` : item.count}
            onChange={(e) => {
              const newCount = Number(e.target.value);
              changeCount({ id: item.id, count: newCount });
            }}
          />
          <div>
            <img
              src="/basket/Drop-Up-Small.svg"
              alt=""
              onClick={() => changeCount({ id: item.id, count: item.count + 1 })}
            />
            <img
              src="/basket/Drop-Down-Small.svg"
              alt=""
              onClick={() =>
                item.count > 1 && changeCount({ id: item.id, count: item.count - 1 })
              }
            />
          </div>
        </div>
        <p className="basket_product_prices">${Math.ceil(item.price*(1-item.discount/100)) * item.count}</p>
      </li>
    </>
  );
}
