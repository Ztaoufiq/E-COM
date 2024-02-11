import React, {Fragment, useCallback, useState} from 'react';
import Age from './Age';
import Salary from './Salary';
import Button from './Button';

export default function CallBack() {
    const [age, setAge] = useState(20);
    const [salary, setSalary] = useState(1000);
    console.log('CallBack :');
    const ageUp = useCallback(() => setAge(age + 1), [age]);
    const salaryUp = useCallback(() => setSalary(salary + 100), [salary]);


    return (
        <Fragment>
            <div className="text-center">
                <div className="card-header">
                    See called Components in your Console
                </div>
                <div className="card-body">
                    <div className="card-title"><Age age={age} /></div>
                    <div className="card-title"><Salary salary={salary} /></div>
                    <hr />
                    <div className="text-center">
                        <Button classN={"btn btn-primary btn-lg btn-block"} text={"Age Up"} action={ageUp} />
                        <hr />
                        <Button classN={"btn btn-secondary btn-lg btn-block"} text={"Salary Up"} action={salaryUp} />
                    </div>                    
                </div>
            </div>
        </Fragment>
    )
}

