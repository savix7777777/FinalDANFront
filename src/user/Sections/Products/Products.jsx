import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {createChooseTemplateChanges, createChangeStyle} from "../../../store/actions/actionCreator";
import Button from "../../Components/Button";
import NewProduct from "../../../admin/Components/NewProduct";
import Product from "../../../admin/Components/Product";

let counter = true;

const Products = ({admin,data}) => {

    const dispatch = useDispatch();
    const [productList, setProductList] = useState((data.products) ? data.products.productList : []);
    const [newProduct, setNewProduct] = useState(false);
    const [styleList, setStyleList] = useState((data.products) ? data.products.styleList : {});
    const [styles, setStyles] = useState((data.products) ? data.products.styles : {section: {bc: '#FFF', fontSize:'20', className:'products'}, div:{bc:'#ffffff', width: '40', className: 'products__productsBox'}});
    const [memoryBc, setMemoryBc] = useState();
    const [memoryColor, setMemoryColor] = useState();
    const activeStyle = useSelector((state) => {
        if(styles){
            try{
                if(styles[state.activeStyle.tag].className === state.activeStyle.className){
                    const newStyle = Object.assign({},styles);
                    if(!newStyle.section.bc) newStyle.section.bc = '#ffffff';
                    if(!newStyle.div.bc) newStyle.div.bc = '#ffffff';
                    newStyle[state.activeStyle.tag] = state.activeStyle;
                    return newStyle;
                }
            } catch (e) {
                return  styles;
            }
        }
        return styles;
    }, shallowEqual);
    const panelHide = useSelector(({stylePanelState}) => stylePanelState, shallowEqual);

    const changeStyle = (value) => dispatch(createChangeStyle(value));
    const updateProjectData = (value) => dispatch(createChooseTemplateChanges(value));

    useEffect(() => {
        counter && setStyles(activeStyle);
        counter = !counter;
    },[activeStyle]);

    updateProjectData({products: {styles,productList,styleList}});

    const chooseTag = (e) => {
        e.stopPropagation();
        for(let key in styles){
            if(key === e.target.tagName.toLowerCase()){
                changeStyle(Object.assign(styles[key], {tag: key}));
            }
        }
    };

    const change = () => {
        setNewProduct(!newProduct);
    };

    const addNewProduct = (value) => {
        setProductList(productList.concat(value));
        change();
    };

    const deleteProduct = (value) => {
        const newProductList = productList.slice();
        newProductList.splice(value, 1);
        setProductList(newProductList);
    };

    const returnStyles = (value) => {
        setStyleList(Object.assign(styleList, value));
    };

    const modalBcOver = (e) => {
        e.stopPropagation();
        if(panelHide){
            for(let key in styles){
                if(key === e.target.tagName.toLowerCase()) {
                    const newStyle = Object.assign({},styles);
                    if(newStyle[key].bc !== 'rgb(0,57,167)') setMemoryBc(newStyle[key].bc);
                    if(newStyle[key].color !== 'rgb(76,131,253)') setMemoryColor(newStyle[key].color);
                    if(newStyle[key].bc) newStyle[key].bc = 'rgb(0,57,167)';
                    if(newStyle[key].color) newStyle[key].color = 'rgb(76,131,253)';
                    setStyles(newStyle);
                }
            }
        }
    }

    const modalBcOut = (e) => {
        e.stopPropagation();
        if(panelHide){
            for(let key in styles){
                if(key === e.target.tagName.toLowerCase()) {
                    const newStyle = Object.assign({},styles);
                    if(newStyle[key].bc) newStyle[key].bc = memoryBc;
                    if(newStyle[key].color) newStyle[key].color = memoryColor;
                    setStyles(newStyle);
                }
            }
        }
    }

    return(
        <section onMouseOver={modalBcOver} onMouseOut={modalBcOut} className='products' onClick={chooseTag} style={{backgroundColor: styles.section.bc, fontSize:`${styles.section.fontSize}px`}}>
            {admin && <Button className='news__add-post' onClick={change}>
                Add new product
            </Button>}
            {newProduct && <NewProduct updateData={addNewProduct} />}
            {productList.length !== 0 &&
                <div onMouseOver={modalBcOver} onMouseOut={modalBcOut} onClick={chooseTag} style={{backgroundColor: styles.div.bc, width: `${styles.div.width}%`}} className='news__posts-box-p'>
                    {productList.map((item, index) => {
                        return(
                            <Product
                                returnStyles={returnStyles}
                                deleteProduct={deleteProduct}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                src={item.src}
                                key={index}
                                styleKey={index}
                                admin={admin}
                                style={styleList[`product-${index}`]}
                            />
                        )
                    })}
                </div>
            }
            {productList.length === 0 && admin && <p className='news__clear-p'>Add your products here!</p>}
        </section>
    )
};


export default Products;