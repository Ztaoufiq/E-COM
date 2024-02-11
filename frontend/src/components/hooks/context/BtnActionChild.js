import React, { useContext } from 'react'
import UserContext from './UserContext';

export default function BtnActionChild() {

    const {setUserOne} = useContext(UserContext);
    const handleUpdate = () => { setUserOne("User Name Is Updated") }
  return (
    <div className="text-dark bg-light">
      <div className="card-header">
          <h4>Btn Component</h4>
          <h5 className="card-title"><button className="btn btn-primary btn-lg btn-block card-title" onClick={ handleUpdate} >Update User</button></h5>
      </div>
    </div>
  )
}
