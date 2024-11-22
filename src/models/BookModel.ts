export class BookModel {
    id?: number;
    ISBN: string;
    title: string;
    author: string;
    description: string;
    price: number;
    stock: number;
    categories: number;
    imageUrl: string;
    constructor(
        ISBN: string,
        title: string,
        author: string,
        description: string,
        price: number,
        stock: number,
        imageUrl: string,
        categories: number,
        id?: number
    ) {
        this.ISBN = ISBN;
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.categories = categories;
        this.imageUrl = imageUrl
    }
}