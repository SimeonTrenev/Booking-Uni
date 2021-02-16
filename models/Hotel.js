module.exports = (mongoose) => {
    const { Schema, model: Model } = mongoose;
    const { String, ObjectId, Number } = Schema.Types;

    const hotelSchema = new Schema({
        hotel : {
            type: String,
            required: true,
            unique: true,

        },
        city: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        freeRooms: {
            type: Number,
            required: true,
            minValue: 1,
            maxValue: 100
        },
        usersBooked: [
            {
                type: ObjectId,
                ref: 'User'
            }
        ],
        owner: {
            type: ObjectId,
            required: true
        }
    });

    return Model('Hotel', hotelSchema)
}