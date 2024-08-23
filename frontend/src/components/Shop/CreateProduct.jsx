import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../../static/data';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useRecoilState, useRecoilValue } from 'recoil';
import { server } from '../../server';
import { sellerState } from '../../recoil/atoms/seller';
import axios from 'axios';
import { toast } from 'react-toastify';
import { productState } from '../../recoil/atoms/product';




const CreateProduct = () => {
    const seller = useRecoilValue(sellerState);
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState("");
    const [originalPrice, setOriginalPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [stock, setStock] = useState();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useRecoilState(productState);

    const handleImageChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Set loading state to true to show loader

        const newForm = new FormData();

        images.forEach((image) => {
            newForm.append('images', image);
        });
        newForm.append('name', productName);
        newForm.append('description', description);
        newForm.append('category', category);
        newForm.append('tags', tags);
        newForm.append('originalPrice', originalPrice);
        newForm.append('discountPrice', discountPrice);
        newForm.append('stock', stock);
        newForm.append('shopId', seller._id);
        newForm.append('shop[name]', seller.name);
        newForm.append('shop[avatar]', seller.avatar);
        newForm.append('shop[description]', seller.description);
        newForm.append('shop[createdAt]', seller.createdAt);

        try {
            const response = await axios.post(`${server}/product/create-product`, newForm, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle success response here
            console.log('Product created successfully:', response.data.product);
            // Show success toast
            toast.success('Product created successfully');

            // Update Recoil ProducState
            setProducts((prevProducts) => [response.data.product, ...prevProducts]);

            // Redirect to the dashboard page after successful product creation
            navigate('/dashboard-products');
            window.location.reload();
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error('Error creating product');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className=' w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
            <h5 className='text-[30px] font-Poppins text-center'>Create Product</h5>
            {/* Create Product Form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className='pb-2'>
                        Name <span className='text-red-500'>*</span>
                    </label>
                    <input type="text" name='name' className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' value={productName} onChange={(e) => setProductName(e.target.value)} placeholder='Enter your product name...' />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols="30"
                        required
                        rows="8"
                        type="text"
                        name="description"
                        value={description}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter your product description..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Category <span className='text-red-500'>*</span>
                    </label>
                    <select className='w-full mt-2 border h-[35px] rounded-[5px]' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Choose a category"> Choose a category</option>
                        {
                            categoriesData && categoriesData.map((i) => (
                                <option value={i.title} key={i.title}>
                                    {i.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Tags
                    </label>
                    <input type="text" name='tags' className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Enter product tags...' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Original Price
                    </label>
                    <input type="number" name='price' className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder='Enter your product price...' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Price (With Discount) <span className='text-red-500'>*</span>
                    </label>
                    <input type="number" name='price' className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} placeholder='Enter your product price with discount...' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Product Stock <span className='text-red-500'>*</span>
                    </label>
                    <input type="number" name='stock' className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' value={stock} onChange={(e) => setStock(e.target.value)} placeholder='Enter your product stock...' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Upload Product Images<span className='text-red-500'>*</span>
                    </label>
                    <input type="file" name="" id="upload" className='hidden' multiple onChange={handleImageChange} />
                    <div className='w-full flex items-center flex-wrap'>
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle size={30} className='mt-3' color='#555' />
                        </label>
                        {
                            images && images.map((i) => (
                                <img src={URL.createObjectURL(i)} key={i} alt="" className='h-[120px] w-[120px] object-cover m-2' />
                            ))
                        }
                    </div>
                    <br />
                    <div>
                        <input type="submit" value="Create" className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />
                    </div>
                </div>
            </form>
        </div>

    )
}




export default CreateProduct