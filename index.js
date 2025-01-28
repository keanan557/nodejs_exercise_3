// import sql
import mysql from 'mysql2/promise'

// import config
import {config} from 'dotenv'
config();

const pool = mysql.createPool({
    hostname: process.env.HOSTNAME,
    user:process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

// function return all users
const getUsers = async ()=>{
    let [data] = await pool.query('select * from users')
    return data
}

// function return all products
const getProducts = async ()=>{
    let [data] = await pool.query('select * from products')
    return data
}

// a. a function that deletes a product(delete the product ‘baro’ completely).
const deleteProduct = async (product_code)=>{
    let [data] = await pool.query('delete  from products where product_code=?',[product_code])
    return data
}

// b. a function that inserts a new product (insert your favourite food item).
const insertNewProduct = async(product_code, product_name, product_price, product_quantity)=>{
    let [data] = await pool.query('insert into products(product_code, product_name, product_price, product_quantity) values(?,?,?,?) ',[product_code, product_name, product_price, product_quantity])
    return data
}

// c. a function that will update the existing product information.
const updateExistingProductInfo = async(product_code, product_name, product_price, product_quantity)=>{
    let [data] = await pool.query(
        'update products set product_name=? , product_price=?, product_quantity=? where product_code = ?',
        [ product_name, product_price, product_quantity,product_code]
    )
    return data
}


// test
console.log(await getUsers());
console.log(await getProducts());
console.log(await deleteProduct('baro1'));
console.log(await insertNewProduct('tex04','ex',5.00,50));
console.log(await updateExistingProductInfo('tex01','Texi',19.00,70));
