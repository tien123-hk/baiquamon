import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../CSS/Home.css';
import Anhnen1 from '../assets/anh/nen1.jpg'
import Anhnen2 from '../assets/anh/nen2.jpg'
import Anhnen3 from '../assets/anh/nen3.jpg'
import Anh1 from '../assets/anh/10.jpg'
import Anh2 from '../assets/anh/rau.jpg'
import Anh3 from '../assets/anh/9.jpg'
import Anhsale1 from '../assets/anh/sale1.jpg'
import Anhsale2 from '../assets/anh/sale2.jpg'
import Pro1 from '../assets/anh/pro1.jpg'
import Pro3 from '../assets/anh/pro3.jpg'
import Anh14 from '../assets/anh/14.jpg'
import Anh7 from '../assets/anh/7.jpg'
import Anh15 from '../assets/anh/15.jpg'
import Blog1 from '../assets/anh/blog1.jpg'
import Blog2 from '../assets/anh/blog2.jpg'
import { Link } from 'react-router-dom';
const images = [
    Anhnen1,
    Anhnen2,
    Anhnen3,
];
function Home() {


    const [currentIndex, setCurrentIndex] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedInUser);
    }, []);

    const addToCart = async (product) => {
        if (!user) {
            alert('Please login to add items to cart');
            return;
        }

        try {
            await axios.post('http://localhost:8086/BE/cart/add', {
                userId: user._id,
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add product to cart');
        }
    };

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };


    useEffect(() => {

        const interval = setInterval(handleNextImage, 3000);
        return () => clearInterval(interval);
    }, []);



 // Lấy tất cả nút và danh sách cây
 const filterButtons = document.querySelectorAll('.m1');
 const plants = document.querySelectorAll('.c5');

 // Hàm lọc cây
 function filterPlants(type) {
    plants.forEach(sanpham => {
        const plantType = sanpham.getAttribute('data-type');

        // Hiển thị hoặc ẩn các cây dựa trên loại được chọn
        if (type === 'all' || type === plantType) {
          sanpham.classList.remove('hidden');
        } else {
          sanpham.classList.add('hidden');
        }
    });
     // Cập nhật nút đang được chọn
     filterButtons.forEach(button => {
         button.classList.remove('m1');
         if (button.getAttribute('data-type') === type) {
             button.classList.add('m1');
         }
     });
 }

 // Gán sự kiện cho mỗi nút
 filterButtons.forEach(button => {
     button.addEventListener('click', function() {
         const selectedType = this.getAttribute('data-type');
         filterPlants(selectedType);
     });
 });

 // Khởi tạo với tất cả cây được hiển thị
 filterPlants('all');




    

    return (
    <>
        <div className="home1">
            <div className="nengt">
                <div className="nen1">
                    <img  src={images[currentIndex]}></img>
                    <div className="col-md-12">
                        <h1 className="m-b-20"><strong>Welcome To HusGarden</strong></h1>
                        <p className="m-b-40">See how your users experience your website in realtime or view trends to see any changes in performance over time.</p>
                        
                    </div>
                </div>
                
            </div>
        </div>
        
        <div className="categories-shop">
      <div className="container1">
      
          <div className="c1">
            <div className="shop-cat-box">
              <img className="img-fluid" src={Anh1} alt="Cây Xương Rồng" />
              <Link to='/aboutus' className="btnhvr-hover" href="#">Guarantee</Link>
            </div>
          </div>
          <div className="c1">
            <div className="shop-cat-box">
              <img className="img-fluid" src={Anh2} alt="Rau Củ" />
              <Link to='/sidebarshop'  className="btnhvr-hover" href="#">Product </Link>
            </div>
          </div>
          <div className="c1">
            <div className="shop-cat-box">
              <img className="img-fluid" src={Anh3} alt="Terrarium" />
              <Link to='/gallery' className="btnhvr-hover" >Gallery</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="box-add-products">
      <div className="container2">
        <div className="row2">
          <div className="c2">
            <div className="offer-box-products">
              <img className="img-fluid" src={Anhsale1}  />
            </div>
          </div>
          <div className="c2">
            <div className="offer-box-products">
              <img className="img-fluid" src={Anhsale2} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="products-box">
      <div className="container3">
        <div className="row3">
          <div className="c3">
            <div className="title-alltext-center">
              <h1>Fruits , Vegetables & Strees</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus enim.</p>
            </div>
          </div>
        </div>

        <div className="row4">
          
            <div className="special-menutext-center">
              <div className="button-groupfilter-button-group">
                <button className="active m1 btn_filter" id="m2" data-type="all">All</button>
                <button className="m1" id="m2" data-type=".top-featured">Top featured</button>
                <button className="m1" id="m2" data-type=".best-seller">Best seller</button>
              </div>
            </div>
          
        </div>

        <div className="rowspecial-list">
          <div className="c5" data-type=".best-seller">
            <div className="products-singlefix">
              <div className="box-img-hover">
                <div className="type-lb">
                  <p className="sale">Sale</p>
                </div>
                <img src={Pro1} className="img-fluid" alt="Image" />
                <div className="mask-icon">
                  <button className="cart" onClick={() => addToCart({
                      id: 1,
                      name: 'Carrot',
                      price: 7.79,
                      image: Pro1
                  })}>Add to Cart</button>
                </div>
              </div>
              <div className="why-text">
                <h4>Carrot</h4>
                <h5> $7.79</h5>
              </div>
            </div>
          </div>

          <div className="c5"  data-type=".top-featured">
            <div className="products-singlefix">
              <div className="box-img-hover">
                <div className="type-lb">
                  <p className="new">New</p>
                </div>
                <img src={Anh14} className="img-fluid" alt="Image" />
                <div className="mask-icon">
                  <a className="cart" href="#">Add to Cart</a>
                </div>
              </div>
              <div className="why-text">
                <h4>Betel tree</h4>
                <h5> $9.79</h5>
              </div>
            </div>
          </div>

          <div className="c5"  data-type=".top-featured">
            <div className="products-singlefix">
              <div className="box-img-hover">
                <div className="type-lb">
                  <p className="sale">Sale</p>
                </div>
                <img src={Pro3} className="img-fluid" alt="Image" />
                <div className="mask-icon">
                  <a className="cart" href="#">Add to Cart</a>
                </div>
              </div>
              <div className="why-text">
                <h4>Grape</h4>
                <h5> $10.79</h5>
              </div>
            </div>
          </div>

          <div className="c5"   data-type=".best-seller">
            <div className="products-singlefix">
              <div className="box-img-hover">
                <div className="type-lb">
                  <p className="sale">Sale</p>
                </div>
                <img src={Anh7} className="img-fluid" alt="Image" />
                <div className="mask-icon">
                  <a className="cart" href="#">Add to Cart</a>
                </div>
              </div>
              <div className="why-text">
                <h4>Snake plant</h4>
                <h5> $15.79</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    




    <div className="latest-blog">
      <div className="container4">
        <div className="row5">
          <div className="c6">
            <div className="title-alltext-center1">
              <h1>latest blog</h1>
              <p></p>
            </div>
          </div>
        </div>
        <div className="row6">
          <div className="c7">
            <div className="blog-box">
              <div className="blog-img">
                <img className="img-fluid" src={Blog1}  />
              </div>
              <div className="blog-content">
                <div className="title-blog">
                  <h3>Veagetable</h3>
                  <p>Fresh clean good for health</p>
                </div>
              </div>
            </div>
          </div>
          <div className="c7">
            <div className="blog-box">
              <div className="blog-img">
                <img className="img-fluid" src={Anh15} />
              </div>
              <div className="blog-content">
                <div className="title-blog">
                  <h3>Terrarium</h3>
                  <p>A closed ecosystem that is self-hydrating</p>
                </div>
              </div>
            </div>
          </div>
          <div className="c7">
            <div className="blog-box">
              <div className="blog-img">
                <img className="img-fluid" src={Blog2} alt="" />
              </div>
              <div className="blog-content">
                <div className="title-blog">
                  <h3>Bonsai</h3>
                  <p>Ornamental plants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</>

    );
};

export default Home;
