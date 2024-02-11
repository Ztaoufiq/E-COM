import React, { useContext } from 'react'
import UserContext from './UserContext';

export default function CurrentUser() {

    const {userOne} = useContext(UserContext);
    return (
        <div className="text-dark bg-light">
            <div className="card-header">
                <h4>CurrentUser Component</h4>
                <h5>The user name is : {userOne}</h5>
                <h6>Using Context Provider</h6>
            </div>
        </div>
    )
}
