export class BookModel {
    id?: number;
    ISBN: string;
    title: string;
    author: string;
    description: string;
    price: number;
    stock: number;
    category?: string;
    imageUrl: string;
    Idcategory: number;
    constructor(
        ISBN: string,
        title: string,
        author: string,
        description: string,
        price: number,
        stock: number,
        imageUrl: string,
        idcategory: number,
        id?: number,
        category?: string,
    ) {
        this.ISBN = ISBN;
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.Idcategory = idcategory;
        this.category = category;
        this.imageUrl = imageUrl
    }
}