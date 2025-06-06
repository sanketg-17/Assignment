import Product  from '../model/product.js' ;

const getProduct= (req, res)=>{
    Product.find()
    .then(product=>{
        if(product){  
            console.log(product)          
            res.send(product[0])
        }   else {
        res.status(404).send({ error: 'Product not found' });
      }
    })
    .catch(err=>{
        res.status(500).send({ error: 'Server error', details: err });
    });
    
};

export default getProduct;