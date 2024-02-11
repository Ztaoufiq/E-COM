import React, {Fragment, useEffect, useMemo, useState} from 'react';

const Memo = () => {

    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);
    const [isEvenTwo, setIsEvenTwo] = useState(true);

    const isEvenOne = useMemo(
        () => { 
            let i = 0;
            while (i < 2000000000) i++
            return countOne % 2 === 0
        }, [countOne])

    useEffect( () => { setIsEvenTwo(prev => !prev) }, [countTwo]);

    const HandleClickOne = () => { setCountOne(prev => prev + 1) }
    const HandleClickTwo = () => { setCountTwo(prev => prev + 1) }

    return (
        <Fragment>
            <button className="btn btn-primary btn-lg btn-block" onClick={ HandleClickOne }>{countOne} - Using Memo</button>
            <button className="btn btn-warning btn-lg btn-block">{ isEvenOne ? 'Even' : 'Odd' }</button>
            <button className="btn btn-secondary btn-lg btn-block" onClick={ HandleClickTwo }>{countTwo} - Using Effect</button>
            <button className="btn btn-success btn-lg btn-block">{ isEvenTwo ? 'Even' : 'Odd' }</button>
        </Fragment>        
    )
}

export default Memo;