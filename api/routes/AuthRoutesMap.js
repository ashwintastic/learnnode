const AuthRoutesMap = [

    {
        path: '/user',
        authRequired: true
    },
    {
        path: '/registerDriver',
        authRequired:true
    },
    {
        path: '/getDriverVehicle',
        authRequired: true
    },
    
    {
        path: '/login',
        authRequired: false
    }
];

export default AuthRoutesMap;