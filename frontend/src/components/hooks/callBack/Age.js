import React from 'react'

function Age({age}) {
    console.log('Call To Age Component');
    return (
        <h3>{age}</h3>
    )
}

export default React.memo(Age);