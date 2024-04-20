import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';
import { navItems } from '../../static/data';

const NavBar = ({active}) => {
  return (
    <div className={`${styles.normalFlex}`}>
        {
            navItems && navItems.map((i, index)=>(
                <div className='flex'>
                    <Link to={i.url} className={`${active=== index +1 ? "text-[#44ff98]" : "text-[#fff]"} font-[500] text-lg px-6 cursor-pointer`}>
                        {i.title}
                    </Link>
                </div>
            ))
        }

    </div>
  )
}

export default NavBar