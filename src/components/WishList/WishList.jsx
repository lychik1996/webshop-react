import './wishList.scss';
import { Link } from 'react-router-dom';


import WishListItem from './WishLIstItem';
import WishListForU from './WishListForU';
import {useLoadWishListQuery} from '../../store/api/apiWish';
import { useAddInBasketMutation, useChangeCountBasketMutation, useLoadBasketQuery } from '../../store/api/apiBasket';
// const data = [
//   { id: 1, name: 'Gucci duffle bag', price: 1160, discount: 35, new:false },
//   { id: 2, name: 'RGB liquid CPU Cooler', price: 1960, discount: 0, new:true },
//   { id: 3, name: 'GP11 Shooter USB Gamepad', price: 550, discount: 0, new:true },
//   { id: 4, name: 'Quilted Satin Jacket', price: 750, discount: 0, new:false },
// ];
const dataforU = [
  {
    id: 1,
    name: 'ASUS FHD Gaming Laptop',
    category:'Gaming',
    price: 1160,
    discount: 35,
    new: false,
    rating: 4,
  },
  {
    id: 2,
    name: 'IPS LCD Gaming Monitor',
    category:'Gaming',
    price: 1960,
    discount: 0,
    new: false,
    rating: 3,
  },
  {
    id: 3,
    name: 'HAVIT HV-G92 Gamepad',
    category:'Gaming',
    price: 550,
    discount: 0,
    new: true,
    rating: 5,
  },
  {
    id: 4,
    name: 'AK-900 Wired Keyboard',
    category:'Gaming',
    price: 750,
    discount: 0,
    new: false,
    rating: 2,
  },
];
export default function WishList() {
  const {data: dataWishList}=useLoadWishListQuery();
  const {data: dataBasket}=useLoadBasketQuery();
  const [addToBasket]=useAddInBasketMutation();
  const [changeCount] = useChangeCountBasketMutation();
  

  const addInBasket = ()=>{
    dataWishList.forEach((item)=>{
      if (dataBasket?.some((i) => i.name === item.name)) {
        const elem = dataBasket?.find((i) => i.name === item.name);
        changeCount({ id: elem.id, count: elem.count + 1 });
      } else {
        const itemWithOutId = { ...item };
        delete itemWithOutId.id;
        addToBasket(itemWithOutId);
      }
    })
  }
  
  return (
    <>
      <div className="container">
        <div className="wishList_top">
          <p>Wishlist({dataWishList.length})</p>
          <button onClick={()=>addInBasket()}>Move All To Bag</button>
        </div>
        <ul className="wishList_items">
            {dataWishList?.map((item,index)=>(
                <WishListItem key={index} item={item} index ={index}/>
            ))}
        </ul>
        <div className="wishList_bot">
          <div className="wishList_bot-left">
            <div></div>
            <p>Just For You</p>
          </div>
          <Link>See All</Link>
        </div>
        <ul className="wishList_forU">
          {dataforU.map((item)=>(
            <WishListForU key={item.id} item={item}/>
          ))}
        </ul>
      </div>
    </>
  );
}
