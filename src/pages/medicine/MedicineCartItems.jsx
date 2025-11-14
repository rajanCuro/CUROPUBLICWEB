// src/pages/medicine/MedicineCartItems.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Authorization/AuthContext";
import axiosInstance from "../../Authorization/axiosInstance";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";



function MedicineCartItems() {
    const navigate = useNavigate();
    const { userData, getAllMedicineCartItems } = useAuth();

    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const id = userData?.id

    const getAllCartItems = async (id) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(
                `/endUserEndPoint/getCartItems?userId=${id}`
            );

            const data = response.data?.dtoList || [];

            // Filter items addedByPharmacyId === 0
            const filtered = data.filter((item) => item.addedByPharmacyId === 0);

            setCartData(filtered);
        } catch (error) {
            console.log("Cart fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Refresh on success
    useEffect(() => {
        if (id) {
            getAllCartItems(id)
            getAllMedicineCartItems(id);
        }
    }, [userData]);
    const handleIncrease = async (itemId) => {
        const item = cartData.find((x) => x.id === itemId);
        if (!item) return;

        if (item.quantity >= 10) return toast.error("Max quantity 10");

        try {
            await axiosInstance.put(
                `/endUserEndPoint/increaseItemQuantity?cartItemId=${itemId}`
            );

            setCartData((prev) =>
                prev.map((i) =>
                    i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
                )
            );
        } catch {
            toast.error("Failed to increase");
        }
    };

    const handleDecrease = async (itemId) => {
        const item = cartData.find((x) => x.id === itemId);
        if (!item) return;

        try {
            if (item.quantity <= 1) {
                setCartData((prev) => prev.filter((i) => i.id !== itemId));
                await axiosInstance.delete(
                    `/endUserEndPoint/deleteCartItem?cartItemId=${itemId}`
                );
                getAllMedicineCartItems(id);
                return toast.success("Item removed");
            }

            await axiosInstance.put(
                `/endUserEndPoint/decreaseItemQuantity?cartItemId=${itemId}`
            );

            setCartData((prev) =>
                prev.map((i) =>
                    i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
                )
            );
        } catch {
            toast.error("Failed to update");
        }
    };

    const handleDeleteItem = async (item) => {
        try {
            setCartData((prev) => prev.filter((i) => i.id !== item.id));

            await axiosInstance.delete(
                `/endUserEndPoint/deleteCartItem?cartItemId=${item.id}`
            );
            getAllMedicineCartItems(id);

            toast.success("Removed from cart");
        } catch (error) {
            toast.error("Error removing item");
            setCartData((prev) => [...prev, item]);
        }
    };

    const EmptyCart = () => (
        <div className="flex h-screen flex-col items-center justify-center py-20">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
                <FiShoppingCart />
            </div>
            <h2 className="text-2xl font-bold text-gray-700">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-4">Start adding items to your cart!</p>
            <button
                onClick={() => navigate("/")}
                className="bg-green-500 text-white px-6 py-2 rounded-md shadow"
            >
                Browse Products
            </button>
        </div>
    );

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
                <p className="mt-3 text-gray-600">Loading cart...</p>
            </div>
        );

    if (cartData.length === 0) {
        return <EmptyCart />;
    }

    // Total Price
    const totalAmount = cartData.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
    );

    return (
        <div className="min-h-screen pb-28 px-4 container mx-auto">
            <p className="text-sm text-gray-600 mt-4">
                Total {cartData.length} items
            </p>

            {/* CART LIST */}
            <div className="mt-4 space-y-4">
                {cartData.map((item) => {
                    const medicine = item.medicineBatch?.medicine;

                    return (
                        <div
                            key={item.id}
                            className="bg-white  p-4 rounded-md border border-gray-200 flex justify-between items-center gap-4 "
                        >


                            <div className="flex gap-4">
                                <img
                                    src={
                                        medicine?.imagesUrl?.[0] ||
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQywcmMUL-iZxqJ_yZYp67MaZefH7aXhMPS5w&s"
                                    }
                                    className="w-20 h-20 object-contain bg-gray-100 rounded"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                                        {medicine?.name || "Medicine"}
                                    </h3>

                                    <p className="text-sm text-gray-600">
                                        ₹{item.unitPrice} × {item.quantity} ={" "}
                                        <span className="font-semibold">
                                            ₹{item.unitPrice * item.quantity}
                                        </span>
                                    </p>

                                    {/* Quantity Control */}
                                    <div className="flex items-center gap-3 bg-gray-100 w-28 mt-2 px-2 py-1 rounded">
                                        <button
                                            className="bg-white cursor-pointer w-7 h-7 rounded-full shadow flex items-center justify-center"
                                            onClick={() => handleDecrease(item.id)}
                                        >
                                            −
                                        </button>

                                        <span className="font-semibold">{item.quantity}</span>

                                        <button
                                            className="bg-white cursor-pointer w-7 h-7 rounded-full shadow flex items-center justify-center"
                                            onClick={() => handleIncrease(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button className="mr-10 cursor-pointer hover:bg-red-200 rounded-full p-2 bg-red-50 transition duration-300" onClick={() => handleDeleteItem(item)}>
                                <FaRegTrashAlt className="text-red-500 cursor-pointer" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* SUBTOTAL */}
            

            {/* CHECKOUT BUTTON */}
            <div className="  mt-10">
                <button
                    className="bg-green-600 text-white px-4 cursor-pointer py-2 rounded-lg text-lg font-semibold"
                    onClick={() =>
                        navigate("/medicine/checkout", { state: { cartData, totalAmount } })
                    }
                 >
                    Place Order (₹{totalAmount.toFixed(2)})
                </button>
            </div>
        </div>
    );
}

export default MedicineCartItems;
