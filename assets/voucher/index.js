const stringifyVouchers = [
    {
        id: 1,
        name: '20%off',
    },
    {
        id: 2,
        name: '30%off',
    },
    {
        id: 3,
        name: '40%off',
    },
    {
        id: 4,
        name: '20NGHIN',
        sellPrice: 20000,
    },
    {
        id: 5,
        name: '30NGHIN',
        sellPrice: 30000,
    },
];

const localStorageVouchers = JSON.stringify(stringifyVouchers);
localStorage.setItem('localVoucher', localStorageVouchers);
