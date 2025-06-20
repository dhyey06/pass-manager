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
        <div>
          <button className='flex justify-center items-center gap-3 px-6 py-2 font-semiboldbold rounded-2xl text-sm cursor-pointer bg-[#2f3949] hover:bg-[#2b333d] duration-150'>
            <img className='w-7' src="/icons/github.png" alt="Github Logo" />
            <p>Github</p>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
