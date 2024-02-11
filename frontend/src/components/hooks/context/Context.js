import React, { useState } from 'react';
import User from './User';

import UserContext from './UserContext';

export default function Context() {
    const [userOne, setUserOne] = useState('SomeOne');

    const userValues = { userOne, setUserOne };

    return (
        <UserContext.Provider value={ userValues }>
            <div className="text-white bg-secondary">
                <div className="card-header">
                    <h4>Context Component</h4>
                    <h5>The user name is : { userOne }</h5>
                    <User />
                </div>
            </div>
        </UserContext.Provider>

    )
}
