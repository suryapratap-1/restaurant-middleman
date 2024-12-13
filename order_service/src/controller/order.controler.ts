import OrderModel from "../models/order.model";

export const createOrder = async (request: any, response: any) => {
    try {
        const body = request.body;

        // integration service that send order to the respected restaurants POS

        const orderResponse = await OrderModel.create(body);

        return response.status(200).json({
            success: true,
            orderResponse
        })
    } 
    catch (error: any) {
        console.error("Error creating order.", error);
        return response.status(500).json({
            success: false,
            message: "Error creating order",
            error: error.message
        })
    }
}

export const getOrderStatus = async (request: any, response: any) => {
    try {
        const orderId = request.params.orderId;
        const order = await OrderModel.findById(orderId);
        return response.status(200).json({
            success: true,
            order
        })
    } 
    catch (error: any) {
        console.error("Error getting order status.", error);
        return response.status(500).json({
            success: false,
            message: "Error getting order status",
            error: error.message
        })
    }
}