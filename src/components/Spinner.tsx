import React from "react";
import Image from "next/image";

export const Spinner: React.FC = () => {
    return (
        <div className='flex justify-center mt-12'>
            <Image
                src={"/spinner.svg"}
                alt="spinner"
                width={200}
                height={200}                
            />
        </div>
    );
};
