import express from "express"
const app = express()
const PORT = 8000


app.get("/product", (req,res)=>{
    return res.json([
        {id:1, name: "Product 1"},
        {id:2, name: "Product 2"}
    ])
})
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
    
})
