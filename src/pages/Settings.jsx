import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'

export default function Settings() {
  return (
    <div className="mx-auto text-slate-900 m-4 px-4 mb-4 grid lg:grid-cols-10">
      <div className="hidden lg:grid lg:col-span-3 relative">
        <Nav />
      </div>
      <div className='col-span-7'>

    <Header title={'Settings'}/>
      </div>
    </div>
  )
}
