import React from 'react'
import useGetProducts from '../../hooks/getProducts';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Loader from '../Layout/Loader'
import useDeleteProduct from '../../hooks/deleteProducts';
import { useRecoilValue } from 'recoil';
import { sellerState } from '../../recoil/atoms/seller';


const AllProducts = () => {
  const { _id } = useRecoilValue(sellerState);
  const { products } = useGetProducts(_id);
  const { deleteProduct, loading } = useDeleteProduct();

  const handleDelete = (productId) => {
    deleteProduct(productId);
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
      field: "Stock",
      headerName: "Stock",
      minWidth: 80,
      type: "number",
      flex: 0.8,
    },
    {
      field: "sold",
      headerName: "Sold out",
      minWidth: 130,
      type: "number",
      flex: 0.6,
    },
    {
      field: "Preview",
      headerName: "",
      minWidth: 100,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        )
      }
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
  products && products.forEach((item) => {
    row.push({
      id: item._id,
      name: item.name,
      price: "US$ " + item.discountPrice,
      Stock: item.stock,
      sold: item.sold_out,
    });
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllProducts