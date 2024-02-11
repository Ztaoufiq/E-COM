import React, { Fragment } from 'react';
import CallBack from './callBack/CallBack';
import Memo from './memo/Memo';
import Ref from './ref/Ref';
import Context from './context/Context';
import Reducer from './reducer/Reducer';

const Hooks = () => {
     
    return (
        <Fragment>
            <section className="row mt-5">
                <div className="col-6">
                    <h3>Context :</h3>
                    <Context />
                    <hr />
                    <h3>CallBack :</h3>
                    <CallBack />
                </div>
                <div className="col-6">
                    <h3>Reducer :</h3>
                    <Reducer />
                    <hr />
                    <h3>Memo :</h3>
                    <Memo />
                    <hr />
                    <h3>Ref :</h3>
                    <Ref />
                </div>                
            </section>            
        </Fragment>
    )
}

export default Hooks;