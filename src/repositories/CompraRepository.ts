import { DataBase } from "../config/turso";
import { CompraModel } from "../models/CompraModel";

export class CompraRepository {
    static async createCompra(compra: CompraModel): Promise<CompraModel> {
        const newCompra = 'INSERT INTO Compras (user_id, book_id, Fecha_compra, cantidad, total) VALUES (:user_id, :book_id, :Fecha_compra, :cantidad, :total) RETURNING *';
        try {
            const result = await DataBase.execute({
                sql: newCompra,
                args: {
                    user_id: compra.user_id,
                    book_id: compra.book_id,
                    cantidad: compra.cantidad,
                    total: compra.total,
                },
            });
            const createdCompra = result.rows[0];

            return new CompraModel(
                Number(createdCompra.User_id),
                Number(createdCompra.Book_id),
                Number(createdCompra.Cantidad),
                Number(createdCompra.Total_amount),
                Number(createdCompra.Id),
                createdCompra.Fecha_compra ? new Date() : new Date(),
            );
        } catch (error) {
            console.error('error al crear compra: repository', error);
            throw new Error('Error al crear compra repository');
        }
    }
}