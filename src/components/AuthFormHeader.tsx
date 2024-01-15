import Image from 'next/image';

export const AuthFormHeader = ({ title }: { title: string }) => {
    return (
        <>
            <p className='text-[24px] font-semibold'>
                {title}
            </p>
            <div className='flex justify-center items-center w-full text-center max-w-[80px] h-[80px] bg-grey-200 rounded-full'>
                <Image
                    src={'/icons/user.svg'}
                    alt={'user'}
                    width={50}
                    height={50}
                />
            </div>
        </>
    );
};
