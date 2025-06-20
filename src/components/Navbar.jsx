import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#22262b] text-white'>
      <div className="mycontainer mx-auto flex justify-between items-center px-4 py-5 h-14">

        <div className="logo font-bold text-2xl">
          <a href="#">
            Only<span className='text-[#5c6bc0]'>PASS</span>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
