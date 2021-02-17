module.exports = (mongoose) => {

    const { Schema, model: Model } = mongoose;
    const { String, ObjectId, Number } = Schema.Types;

    const hotelSchema = new Schema({
        hotel: {
            type: String,
            required: true,
            unique: true
        },
        city: {
            type: String,
            required: true,
            
        },
        imageUrl: {
            type: String,
            required: true
        },
        freeRooms: {
            type: Number,
            required: true,
            
        },
        owner: {
            type: ObjectId,
            require: true
        },
        usersBooked: [
            {
                type: ObjectId,
                ref: 'User'
            }
        ]
    });

    return Model('Hotel', hotelSchema)

}