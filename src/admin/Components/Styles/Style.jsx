import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {createChangeStyle} from "../../../store/actions/actionCreator";


const Style = () => {

    const dispatch = useDispatch();
    const styles = useSelector((state) => state.activeStyle);
    const changeStyle = (value) => dispatch(createChangeStyle(value));

    const returnStyles = ({target}) => {
        if(target.value === ''){
            changeStyle(styles);
        } else{
            const newStyles = Object.assign({}, styles);
            newStyles[target.id] = target.value;
            changeStyle(newStyles);
        }
    };

    return(
        <div className='style'>
            {styles.tag && <h2 className='style__tagName'>{styles.tag}</h2>}
            {styles.bc && <div>Background color:<input id='bc' onChange={returnStyles} type='color' value={styles.bc}/></div>}
            {styles.height && <div>Height:<input id='height' onChange={returnStyles} type='number' value={styles.height} min='1'/></div>}
            {styles.fontSize && <div>Font size:<input id='fontSize' onChange={returnStyles} type='number' min='10' value={styles.fontSize}/></div>}
            {styles.color && <div>Text color:<input id='color' onChange={returnStyles} type='color' value={styles.color}/></div>}
            {styles.width && <div>Width:<input id='width' onChange={returnStyles} type='number' value={styles.width} min='10'/></div>}
            {styles.marginTop && <div>Top indent:<input id='marginTop' onChange={returnStyles} type='number' value={styles.marginTop} min='0' max='48'/></div>}
            {styles.marginBottom && <div>Bottom indent:<input id='marginBottom' onChange={returnStyles} type='number' value={styles.marginBottom} min='0' max='48'/></div>}
            {styles.marginRight && <div>Right indent:<input id='marginRight' onChange={returnStyles} type='number' value={styles.marginRight} min='0' max='48'/></div>}
            {styles.marginLeft && <div>Left indent:<input id='marginLeft' onChange={returnStyles} type='number' value={styles.marginLeft} min='0'/></div>}
            {styles.br && <div>Border radius:<input id='br' onChange={returnStyles} type='number' value={styles.br} min='0'/></div>}
        </div>
    )
};


export default Style;