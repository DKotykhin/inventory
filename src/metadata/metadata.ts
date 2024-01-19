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
    title: 'Error',
};

// auth pages
export const forgotPasswordPageMetaData: Metadata = {
    title: 'Forgot password',
};
export const sendEmailMessagePageMetaData: Metadata = {
    title: 'Send email',
};
export const setNewPasswordPageMetaData: Metadata = {
    title: 'Set new password',
};
export const signInPageMetaData: Metadata = {
    title: 'Sign in',
};
export const signUpPageMetaData: Metadata = {
    title: 'Sign up',
};
export const verifyEmailPageMetaData: Metadata = {
    title: 'Verify email',
};

// protected user pages
export const groupsPageMetaData: Metadata = {
    title: 'Groups',
};
export const productsPageMetaData: Metadata = {
    title: 'Products',
};
export const settingsPageMetaData: Metadata = {
    title: 'Settings',
};
export const usersPageMetaData: Metadata = {
    title: 'Users',
};
export const createProductPageMetaData: Metadata = {
    title: 'Create new product',
};
