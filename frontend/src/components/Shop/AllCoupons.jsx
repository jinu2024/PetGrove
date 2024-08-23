import React, { useEffect, useState } from 'react'
import useGetProducts from '../../hooks/getProducts';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Loader from '../Layout/Loader'
import useDeleteProduct from '../../hooks/deleteProducts';
import styles from'../../styles/styles';
import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { server } from '../../server';
import { useRecoilValue } from 'recoil';
import { sellerState } from '../../recoil/atoms/seller';


const AllCoupons = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const { products } = useGetProducts();
    const [coupons, setCoupons] = useState([]);
    const [minAmount, setMinAmout] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState(null);
    const {_id} = useRecoilValue(sellerState);
    const { deleteProduct, loading } = useDeleteProduct();

    const handleDelete = (productId) => {
        deleteProduct(productId);
    };

    useEffect(() => {
        setIsLoading(true);
        axios
          .get(`${server}/coupon/get-coupon/${_id}`, {
            withCredentials: true,
          })
          .then((res) => {
            setIsLoading(false);
            setCoupons(res.data.couponCodes);
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }, [_id, setCoupons]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/coupon/create-coupon-code`, {
                name,
                minAmount,
                maxAmount,
                selectedProduct,
                value,
                shopId: _id,
            }, { withCredentials: true });

            console.log(res.data);
            toast.success('Coupon created successfully');
            setOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error creating coupon:', error);
            toast.error(error.response?.data?.message || 'Error creating coupon');
        }
    };


    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 100,
            flex: 0.6,
        },

        {
            field: "Delete",
            headerName: "",
            minWidth: 120,
            flex: 0.8,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => handleDelete(params.row.id)}>
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                )
            }
        },
    ];

    const row = [];
    coupons && coupons.forEach((item) => {
        row.push({
            id: item._id,
            name: item.name,
            price: item.value + '%',
            sold: 10,
        });
    });
    return (
        <>
  {isLoading ? (
    <Loader />
  ) : (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <div className="w-full flex justify-end">
          <div className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`} onClick={()=> setOpen(true)}>
            <span className="text-white">Create Coupon Code</span>
          </div>
        </div>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
      {
        open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
                <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4" style={{height: "fit-content"}}>
                    <div className="w-full flex justify-end">
                    <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)}/>
                    </div>
                    <h5 className='text-[30px] font-Poppins text-center'>Create Coupon Code</h5>
                    {/* create coupoun code */}
                 <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your coupon code name..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Discount Percentenge{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={value}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter your coupon code value..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Min Amount</label>
                    <input
                      type="number"
                      name="value"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMinAmout(e.target.value)}
                      placeholder="Enter your coupon code min amount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Max Amount</label>
                    <input
                      type="number"
                      name="value"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter your coupon code max amount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Selected Product</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="Choose your selected products">
                        Choose a selected product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
                </div>
            </div>
        )
      }
    </div>
  )}
</>
    );
  };

export default AllCoupons