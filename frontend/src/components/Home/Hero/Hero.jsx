import React from 'react';
import styles from '../../../styles/styles';
import bannerImage from '../../../Assets/banner.jpg';
import {Link} from 'react-router-dom';

const Hero = () => {
    return (
        <div className={`relative min-h-[100vh] 800px:min-h-[100vh] w-full bg-no-repeat ${styles.normalFlex} justify-center items-center`} style={{ 
         backgroundImage: `url(${bannerImage})` }}>
            <div className={`${styles.section} w-[90%] 800px:w-[60%] flex flex-col items-center justify-center`}>
                <h1 className={`text-[35px] ml-20 leading-[1,2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
                    Your Pet's Paradise
                </h1>
                <p className='ml-20 pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum maxime temporibus earum ea sit magnam hic illum facilis quae totam sint amet optio maiores tempore aspernatur, dolorem nam commodi sunt eligendi architecto tempora fuga. Illo dolorem expedita cum sint adipisci repellendus porro reprehenderit eligendi perferendis, id aliquid voluptates hic ab!
                </p>
                <Link to='/products' className='inline-block'>
                    <div className={`${styles.button} mt-5 `}>
                        <span className='text-[#fff] font-[Poppins]text-[18px]'>
                            Shop Now
                        </span>
                    </div>
                </Link>
            </div>
         </div>
    );
}

export default Hero;
