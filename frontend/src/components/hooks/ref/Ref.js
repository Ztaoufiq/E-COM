import React, {Fragment, useRef, useState} from 'react';

const Ref = () => {

    const [claaNameBtn, setClaaNameBtn] = useState('btn-success');
    const [btnAction, setBtnAction] = useState('Success to Error');
    const [btnText, setBtnText] = useState('Success');

    const btnRef = useRef();

    const changeColor = () => {
        if (btnRef.current.className.indexOf('btn-success') > -1) {
            setClaaNameBtn(btn => 'btn-danger');
            setBtnText(type => 'Error');
            setBtnAction(action => 'Error to Success');
          } else {
            setClaaNameBtn(btn => 'btn-success');
            setBtnText(type => 'Success');
            setBtnAction(action => 'Success to Error');
          }         
    }

    return (
        <Fragment>
            <button className="btn btn-primary btn-lg btn-block" onClick={ changeColor }>{btnAction}</button>
            <button ref={btnRef} className={`btn btn-lg btn-block ${claaNameBtn}`} disabled>{ btnText }</button>            
        </Fragment>
    )
}

export default Ref;