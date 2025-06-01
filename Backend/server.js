import express from 'express';
import mongoose from 'mongoose';
import Product from './model/product.js';
import cors from 'cors';


const router = express.Router();
const app = express()


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


import getProduct from './controller/productController.js';
import order from './controller/order.js';
import getUser from './controller/user.js';
import orderData from './controller/orderData.js';

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const port = process.env.PORT || 8080;


mongoose.connect('mongodb+srv://Sanket:xQoeYPizVmzP3VHf@cluster0.kpbtq.mongodb.net/assignment?retryWrites=true&w=majority&appName=Cluster0')
.then(result => {
    app.listen(port);
    addProduct();
})
.catch(err => {
    console.log(err)
});

const addProduct = async () => {
    const exists = await Product.findOne({ title: 'Nike zoom pegasus 41 running shoes' });
    
    if (!exists) {
        await Product.create({
            title: 'Nike zoom pegasus 41 running shoes',
            description: '',
            price: 10000,
            imageUrl: 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/189ce4af-d0e3-436c-a92e-b7231bcab00b/AIR+ZOOM+PEGASUS+41+CM.png',
            variants: ['Black', 'White', 'Red','Blue'],
            sizes: ['6', '7', '8', '9', '10', '11', '12'],
            inventory: 100
        });
        
        console.log('Sample product seeded to DB');
    }
};


app.get('/api/products', getProduct )
app.post('/api/product', order)
app.post('/api/user', getUser)
app.get('/api/thank-you/:id', orderData)