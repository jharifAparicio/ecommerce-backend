import { DataBase } from "../config/turso";
import { CompraModel } from "../models/CompraModel";

export class CompraRepository {
    static async createCompra(compra: CompraModel): Promise<CompraModel> {
        const newCompra = 'INSERT INTO Purchases (UserId, BookId, Quantity, Total) VALUES (:user_id, :book_id, :cantidad, :total) RETURNING *';
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
                Number(createdCompra.UserId),
                Number(createdCompra.BookId),
                Number(createdCompra.Quantity),
                Number(createdCompra.Total),
                Number(createdCompra.Id),
                createdCompra.Date ? new Date() : new Date(),
            );
        } catch (error) {
            console.error('error al crear compra: repository', error);
            throw new Error('Error al crear compra repository');
        }
    }
}