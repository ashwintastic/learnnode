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







