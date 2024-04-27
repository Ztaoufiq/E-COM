import React, { Fragment, useEffect, useState } from 'react';
import Metadata from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layout/Loader';
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";

const Home = () => {
    
    const [currentPage, setCureentPage] = useState(1)
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage, filteredProoductsCount} = useSelector(state => state.products);

    //const keyword = match.params.keyword;
    const { keyword } = useParams();

    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(getProducts(keyword, currentPage));      
    }, [dispatch, alert, error, keyword, currentPage]);

    function setCureentPageNo(pageNumber) {
        setCureentPage(pageNumber);
    }

    let count = productsCount;
    if(keyword !== '') {
        count = filteredProoductsCount;
    }
    
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <Metadata title={'Buy Best Products Online'}/>

                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            { products && products.map(product => {
                                return(
                                    <Product key={product._id} product={product} />
                                )
                            })}                    
                        </div>
                    </section>

                    { resPerPage <= count && (
                        <div className='d-flex justify-content-center mt-5'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={count}
                                onChange={setCureentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass='page-item'
                                linkClass='page-link'
                            />
                        </div>
                    )}

                    
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home;