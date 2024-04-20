import React from 'react'
import styles from '../../styles/styles'

const Sponsored = () => {
  return (
    <div className={`${styles.section} hidden sm:block bg-white py-10 mb-12 cursor-pointer rounded-xl`}>
        <div className="flex justify-between w-full">
            <div className='flex items-center'>
                <img src="https://www.pedigree.in/themes/custom/pedigreeclub/images/logo1.png" alt=""  style={{width: '180px', objectFit:'contain'}}/>
            </div>
            <div className='flex items-center'>
                <img src="https://www.whiskas.in/sites/g/files/fnmzdf2051/files/logo_whiskas.png" alt="" style={{width: '180px', objectFit:'contain'}}/>
            </div>
            <div className='flex items-center'>
                <img src="https://www.petsmart.com/on/demandware.static/Sites-PetSmart-Site/-/default/dw6f40855f/images/petsmart-logo.png" alt="" style={{width: '180px', objectFit:'contain'}} />
            </div>
            <div className='flex items-center'>
                <img src="https://drools.com/assets/images/logo_new.png" alt="" style={{width: '180px', objectFit:'contain'}}/>
            </div>
            <div className='flex items-center'>
                <img src="https://waudog.com/cdn/shop/files/Logo_WAUDOG.png?v=1624954899" alt="" style={{width: '180px', objectFit:'contain'}}/>
            </div>
        </div>
    </div>
  )
}

export default Sponsored