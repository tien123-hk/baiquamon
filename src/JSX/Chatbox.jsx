// import React from 'react'
import { useEffect } from "react";
import '../CSS/Gallery.css';
const Chatbox = () => {
  useEffect(() => {
    // Tạo script để nhúng chatbox.js
    const script = document.createElement("script");
    script.src = "https://app.tudongchat.com/js/chatbox.js";
    script.async = true;

    script.onload = () => {
      // Đảm bảo thư viện đã được load xong trước khi gọi TuDongChat
      if (window.TuDongChat) {
        const tudong_chatbox = new window.TuDongChat("Z5J-qA8-82ULbATrmetnf");
        tudong_chatbox.initial();
      }
    };

    document.body.appendChild(script);

    return () => {
      // Clean up nếu cần
      document.body.removeChild(script);
    };
  }, []);

  return null; // Không hiển thị gì cả, chỉ nhúng chatbox
};

export default Chatbox;

// function BuyItem({ id, img, name, gia, quantity, onQuantityChange, onRemove }) {


   
    


//     return (
//         <tr key={id}>
//         <td className="thumbnail-img">
//             <a href="#">
//                 <img className="img-fluid" src={img} alt={name} />
//             </a>
//         </td>
//         <td className="name-pr">
//             <a href="#">{name}</a>
//         </td>
//         <td className="price-pr">
//             <p>${gia.toFixed(2)}</p>
//         </td>
//         <td className="quantity-box">
//             <input
//                 type="number"
//                 size="4"
//                 value={quantity}
//                 min="0"
//                 step="1"
//                 className="c-input-text qty text"
//                 onChange={(e) => onQuantityChange(id, parseInt(e.target.value))}
//             />
//         </td>
//         <td className="total-pr">
//             <p>${(gia * quantity).toFixed(2)}</p>
//         </td>
//         <td className="remove-pr">
//             <button className="close-btn" onClick={() => onRemove(id)}>✖</button>
//         </td>
//     </tr>

//     )
// }

// export default BuyItem;