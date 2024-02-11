import React from 'react'

function Salary({salary}) {
    console.log('Call To Salary Component');
    return (
        <h3>{salary}</h3>
    )
}

export default React.memo(Salary);