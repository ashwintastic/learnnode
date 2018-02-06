db.users.aggregate([

    {
        $lookup:
            {
                from: 'vehicles',
                localField: "_id",
                foreignField: "vehicleBelongsTo",
                as: "drivers_vehicles"
            }
    },

    {
        $project: {
            email: 1,
            phone: 1,
            firstName: 1,
            lastName: 1,
            "drivers_vehicles.name": 1,
            "drivers_vehicles._id": 1,
            "drivers_vehicles.vNumber": 1,
            "drivers_vehicles.maxCapacity": 1,
            "drivers_vehicles.vehicleDocs": 1
        }

    },
    {
        $unwind: "$drivers_vehicles"
    },
    {
        $group: {
            _id: "$_id",
            drivers_vehicles: {
                $addToSet: "$drivers_vehicles.vehicleDocs"
            }
        }
    }


]).pretty()



//----------------------
db.passengers.aggregate(
    {$addFields : { count : {$size :  {$ifNull: [{$objectToArray : "$hasSubscribedAvehicle"},[]]}  }}},
    {$sort : {count : 1 }}
)



// --------------------------------------

db.passengers.aggregate(
    {
        $addFields : {
            count : {
                $size : {$ifNull: [{$objectToArray : "$hasSubscribedAvehicle"},[]]}
            }

        }
    },



    {$sort : {count : -1 }},
    {$project: {firstName: 1, lastName: 1, phone: 1,hasSubscribedAvehicle:1, count: 1, bla: 1} }

)




db.passengers.aggregate(
    {
        $addFields : {
            count : {
                $size : {$ifNull: [{$objectToArray : "$hasSubscribedAvehicle"},[]]}
            },
            bla: {
                $size : {$ifNull: [{$objectToArray : "$hasSubscribedAvehicle"},[]]}
            }
        }
    },



    {$sort : {count : -1 }},
    {$project: {firstName: 1, lastName: 1, phone: 1,hasSubscribedAvehicle:1} }

)



// display passender with embedded vehicles with drivers detailos

db.passengers.aggregate([

    {
        $addFields : {
            subscriptions: { "$objectToArray": "$hasSubscribedAvehicle" }
        }
    },



    {
        $lookup: {
            from: "users",
            localField: "subscriptions.v.vehicleBelongsTo",
            foreignField: "_id",
            as: "driver_details"
        }
    },

    {
        $project: {
            "firstName": 1,
            "lastName": 1,
            "phone": 1,
            "hasSubscribedAvehicle": 1,
            "driver_details.firstName": 1,
            "driver_details.lastName": 1,
            "driver_details.email": 1,
            "driver_details.phone": 1,
            "driver_details._id": 1
        }
    }

])

// ------group by ----------------

db.getCollection('vehicles').aggregate(

    {
        $group: {
            _id: "$vehicleBelongsTo",
            total: { $sum: 1},
            totalseat: {$sum: "$maxCapacity"}
        }
    },
    {$sort: {total: -1}}
)

// join from users to vehicles

db.getCollection('users').aggregate(
    {
        $lookup:{
            from: 'vehicles',
            localField: '_id',
            foreignField: 'vehicleBelongsTo',
            as: 'mapping'
        }
    },

    {
        $addFields: {
            countOfVehicle: {$size: "$mapping" }

        }
    },

    {$sort: {countOfVehicle: -1}},
    {$unwind: "$mapping"},
    {$group: {_id: "$_id", drivers_vehicles: {$addToSet: "$mapping"}}}


)


// list all drivers who has no vehicles

db.users.aggregate(
    {
        $lookup: {
            from: 'vehicles',
            localField: '_id',
            foreignField: 'vehicleBelongsTo',
            as: 'nulleDrivers'
        }
    },

    {
        $addFields: {countVehicle: {$size: "$nulleDrivers" } }
    },
    { $match: { "countVehicle" : {$eq: 0}} }

)








