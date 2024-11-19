import { CompraService } from "services/CompraService";
import { Request, Response } from "express";
// import { CompraModel } from "models/CompraModel";

export class CompraController {
    static async createCompra(req: Request, res: Response): Promise<void> {
        try {
            const { User_Id, Book_Id, Cantidad, Total_amount } = req.body;
            const newCompra = await CompraService.createCompra(User_Id, Book_Id, Cantidad, Total_amount);
            res.status(201).json({ compra: newCompra });
        } catch (error) {
            res.status(400).json({
                message: "Error al crear la compra controller" + error
            });
        }
    }
}