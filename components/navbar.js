import Link from 'next/link'
import { useState } from 'react'

export default function Header() {

  return (
    <section className="bg-black navBar">
        <div style={{ maxWidth:"1350px"}} className="m-auto" >
        {/* <a href='tel:+1-877-538-5888'>1-877-538-5888</a> */}
            <Link href='/' > 
              <div className='flex flex-row items-center justify-start cursor-pointer logo'>
                <img src='../image/logo.svg'  className="h-auto logoImage"/> 
                <p className=" mx-2.5 text-xl text-white font-bold logoTitle">SwiftDrop</p>
              </div>        
            </Link>
        </div>
    </section>
  )
}
