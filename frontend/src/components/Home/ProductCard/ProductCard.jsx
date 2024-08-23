import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard';
import { backend_url } from '../../../server';
import useWishlist from '../../../hooks/wishlist'; // Import the useWishlist hook

const ProductCard = ({ data }) => {
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);

    // Check if item is in wishlist
    useEffect(() => {
        const isItemInWishlist = wishlist.some((item) => item._id === data._id);
        setClick(isItemInWishlist);
    }, [wishlist, data._id]);

    if (!data || !data.images || data.images.length === 0) {
        return null;
    }

    const productName = data.name.replace(/\s+/g, '-');
    const imageProduct = `${backend_url}/${data.images[0]}`;

    const handleWishlistClick = () => {
        if (click) {
            removeFromWishlist(data._id);
        } else {
            addToWishlist(data);
        }
        setClick(!click);
    };

    return (
        <>
            <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
                <Link to={`/product/${productName}`}>
                    <img src={imageProduct} alt={data.name} className='w-full h-[170px] object-contain' />
                </Link>
                <Link to={`/shop/preview/${data.shopId}`}>
                    <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
                </Link>
                <Link to={`/product/${productName}`}>
                    <h4 className='pb-3 font-[500]'>
                        {data.name.length > 40 ? `${data.name.slice(0, 40)}...` : data.name}
                    </h4>
                    <div className="flex">
                        {[...Array(5)].map((_, index) => (
                            <AiFillStar key={index} className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
                        ))}
                        <AiOutlineStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
                    </div>
                    <div className='py-2 flex items-center justify-between'>
                        <div className='flex'>
                            <h5 className={`${styles.productDiscountPrice}`}>
                                ${data.discountPrice}
                            </h5>
                            {data.originalPrice && (
                                <h4 className={`${styles.price}`}>
                                    ${data.originalPrice}
                                </h4>
                            )}
                        </div>
                        <span className='font-[400] text-[17px] text-[#68d284]'>
                            {data.sold_out} sold
                        </span>
                    </div>
                </Link>
                {/* Side Options */}
                <div>
                    {click ? (
                        <AiFillHeart
                            size={22}
                            className='cursor-pointer absolute right-2 top-5'
                            onClick={handleWishlistClick}
                            color='red'
                            title='Remove from wishlist'
                        />
                    ) : (
                        <AiOutlineHeart
                            size={22}
                            className='cursor-pointer absolute right-2 top-5'
                            onClick={handleWishlistClick}
                            color='#333'
                            title='Add to wishlist'
                        />
                    )}
                    <AiOutlineEye
                        size={22}
                        className='cursor-pointer absolute right-2 top-14'
                        onClick={() => setOpen(!open)}
                        color='#333'
                        title='Quick View'
                    />
                    <AiOutlineShoppingCart
                        size={22}
                        className='cursor-pointer absolute right-2 top-24'
                        onClick={() => setOpen(!open)}
                        color='#444'
                        title='Add to cart'
                    />
                    {open && (
                        <ProductDetailsCard setOpen={setOpen} data={data} />
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductCard;
