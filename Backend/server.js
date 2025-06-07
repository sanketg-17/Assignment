import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Product from './model/product.js';
import cors from 'cors';

dotenv.config();
const router = express.Router();
const app = express()


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


import getProduct from './controller/productController.js';
import order from './controller/order.js';
import getUser from './controller/user.js';
import orderData from './controller/orderData.js';

app.use(cors({
  origin: ['http://localhost:5173','https://checkout-flow-simulation.vercel.app/'],
  credentials: true
}));

const port = process.env.PORT || 8080;
 const databaseUrl = process.env.MONGO_URI;


mongoose.connect(process.env.MONGO_URI)
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
            description: `The Nike Zoom Pegasus 41 is a responsive running shoe with ReactX foam for improved energy return. Dual Zoom Air units offer soft, springy cushioning. It's lightweight, breathable, and ideal for daily runs.
`,
            price: 10000,
            imageUrl: '/images/AIR+ZOOM+PEGASUS+41+CM.jpg',
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