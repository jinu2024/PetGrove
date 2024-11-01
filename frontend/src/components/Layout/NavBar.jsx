 import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';
import { navItems } from '../../static/data';

const NavBar = ({active}) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
        {
            navItems && navItems.map((i, index)=>(
                <div className='flex'>
                    <Link to={i.url} className={`${active=== index +1 ? "text-[#44ff98]" : "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] text-lg px-6 cursor-pointer`}>
                        {i.title}
                    </Link>
                </div>
            ))
        }

    </div>
  )
}

export default NavBar