import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate,useParams } from "react-router-dom";
const { Option } = Select;

export default function UpdateProduct() {
    const navigate = useNavigate();
    const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping ,setShipping] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("")

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
      setId(data.product._id)
      setName(data.product.name)
      setDescription(data.product.description)
      setPrice(data.product.price)
      setQuantity(data.product.quantity)
      setCategory(data.product.category._id)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSingleProduct()
    //eslint-disable-next-line
  }, [])

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      image && productData.append("image", image);
      productData.append("category", category);
      const { data } = axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete product
  const handleDelete = async () => {
    try {
        let answer = window.confirm("Product will be going to delete ...!!!")
        if(!answer) return;
        // eslint-disable-next-line
        const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
        toast.success("Product Deleted Successfully")
        navigate("/dashboard/admin/products");
    } catch (error) {
        console.log(error);
        toast.error("Something went Wrong")
    }
  }

  return (
    <Layout title={"Dashboard - Create Product"}>
    <div className="container-fluid m-3 p-4">
      <div className="row">
        <div className="col-md-2 flex justify-center">
          <AdminMenu />
        </div>
        <div className="col-md-10">
          <h1 className='text-3xl text-center mb-2 mt-3'>Update Product</h1>
          <div className="m-1">
            <Select
              paceholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3 w-full"
              onChange={(value) => {
                setCategory(value)
              }}
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {image ? image.name : "Upload Image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {image ? (
                <div className="justify-center flex">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="product_image"
                    className="img w-25 img-responsive"
                  />
                </div>
              ):
              (
                <div className="justify-center flex">
                <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                    alt="product_image"
                    className="img w-25 img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select mb-3 w-full"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "yes" : "no"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="m-3 space-x-8">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update Product
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}
