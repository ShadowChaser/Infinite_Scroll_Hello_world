import axios from 'axios'
import React,{useState,useEffect, Fragment} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import 'bootstrap/dist/css/bootstrap.css';  


const FetchImages=()=> {
    const totalCount=30;
    //To Store all the products
    const [product,setProducts]=useState([]);
    
    const imageLimit=5;

    const API_URL="https://dummyjson.com/products"
    
    //Getting the product list and adding to the state
    const getProductList=()=>{
        let skip=Math.ceil(product.length/imageLimit)+5;
        const queryParam="?skip="+ skip+"&limit="+imageLimit;
        axios.get(API_URL+queryParam)
        .then((res)=>{
            const apiResponse=res.data.products;
            //To store prev elements as well
            const mergeData=[...product,...apiResponse]
            setProducts(mergeData)

        })
        .catch((err)=>{
            console.error("Error while loading product")
        })

       
    }

    //calling the function once the component loads
    useEffect(() => {
        getProductList()
    }, [])

    //To fetch next items

    const fetchMoreData=()=>{
        if(product.length<totalCount){
        getProductList()
        }
        
    }

  return (
    <Fragment>
        
        <div className="container" >
            <div className="row" >

            <InfiniteScroll
                    dataLength={product.length}
                    next={fetchMoreData}
                    hasMore={product.length<totalCount}
                    loader={<h4>Loading...</h4>}
                    
                >
            {product.length>0 && product.map((key)=>{
                
                return(
                    <Fragment>
                        <div className='column'>
                         <div className='card mt-4 mb-3 pl-3' >
                            <div className='image-block'>
                                <img src={key.thumbnail} alt="test" style={{height:"6vw",width:"25vh"}}/>
                            </div>
                            <div className='content-block'>
                                <h5>{key.title}</h5>
                            </div>
                        </div>
                        </div>
                    </Fragment>
                )
            })}
        </InfiniteScroll>
                        
        </div>
        </div>
    </Fragment>
  )
}


export default FetchImages;

 