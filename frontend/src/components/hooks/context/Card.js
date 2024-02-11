import React from 'react'
import CurrentUser from './CurrentUser'
import BtnActionChild from './BtnActionChild'

export default function Card() {
  return (
    <div className="text-white bg-info">
        <div className="card-header">
            <h4>Card Component</h4>
            <CurrentUser />
            <hr />
            <BtnActionChild />
        </div>
    </div>
  )
}
