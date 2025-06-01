import Product  from '../model/product.js' ;

const getProduct= (req, res)=>{
    Product.findById('683c07f665b28b24dc079289')
    .then(product=>{
        if(product){  
            console.log(product)          
            res.send(product)
        }   else {
        res.status(404).send({ error: 'Product not found' });
      }
    })
    .catch(err=>{
        res.status(500).send({ error: 'Server error', details: err });
    });
    
};

export default getProduct;