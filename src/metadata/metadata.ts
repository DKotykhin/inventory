import { Metadata } from 'next';

export const viewport = {
    themeColor: '#000000',
    width: 'device-width',
    initialScale: 1,
};

export const generalMetaData: Metadata = {
    authors: [
        {
            name: 'Dmytro Kotykhin',
            url: 'https://dmytro-kotykhin.pp.ua',
        },
    ],
};

export const mainPageMetaData: Metadata = {
    title: 'Inventory app',
    description: 'Inventory app make your life easier',
    keywords: [
        'order, product, accounting, inventory, stock, warehouse, management, business, sales, purchase, invoice, delivery, customer, supplier, report, dashboard, pos, point of sale, barcode, label, inventory app, inventory management, inventory management app, inventory management system, inventory management software, inventory management system app, inventory management system software, inventory management software app, inventory management software system, inventory management system software app, inventory management system software system, inventory management system software system app, inventory management system software system software, inventory management system software system software app, inventory management system software system software system, inventory management system software system software system app, inventory management system software system software system software, inventory management system software system software system software app, inventory management system software system software system software system, inventory management system software system software system software system app',
    ],
    metadataBase: new URL('https://localhost:3000'),
    openGraph: {
        type: 'website',
        url: 'https://localhost:3000',
        title: 'Inventory app',
        description:
        'Inventory app make your life easier',
        images: ['/logo_192.png', '/logo_512.png'],
        siteName: 'Inventory app',
    },
};

export const errorPageMetaData: Metadata = {
    title: 'Error page',
};

export const signInPageMetaData: Metadata = {
    title: 'Sign in page',
};

export const signUpPageMetaData: Metadata = {
    title: 'Sign up page',
};
export const forgotPasswordPageMetaData: Metadata = {
    title: 'Forgot password page',
};
export const sendEmailMessagePageMetaData: Metadata = {
    title: 'Send email page',
};
export const verifyEmailPageMetaData: Metadata = {
    title: 'Verify email page',
};
