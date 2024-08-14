const seatModel = require(`./models/index`).seat
const userModel = require(`./models/index`).user
const eventModel = require(`./models/index`).event
const ticketModel = require(`./models/index`).ticket
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op
exports.addTicket = async (request, response) => {
    /** prepare date for bookedDate */
    const today = new Date()
    const bookedDate = `${today.getFullYear()}-
    ${today.getMonth() + 1}-${today.getDate()}
    ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()
    }`
    /** prepare data from request */
    const { eventID, userID, seats } = request.body;
    try {const seatIDs = await Promise.all(seats.map(async seat => {
        const { rowNum, seatNum } = seat;
        const createdSeat = await seatModel.create({
        eventID,
        rowNum,
        seatNum,
        status: 'true'
        });
        return createdSeat.seatID;
        }));
        // Create ticket records associating the chosen seats
        const tickets = await
        ticketModel.bulkCreate(seatIDs.map(seatID => ({
        eventID,
        userID,
        seatID,
        bookedDate
        })));
        response.status(201).json(tickets);
        } catch (error) {
        return response.json({
        success: false,
        message: error.message
        })
        }
        }
    // Create seat records for the chosen seats
    /** create function for read all data */
exports.getAllTicket = async (request, response) => {
    /** call findAll() to get all data */
    let tickets = await ticketModel.findAll(
    {
    include: [
    { model: eventModel, attributes:
    ['eventName','eventDate','venue']},
    { model: userModel, attributes: ['firstName',
    'lastName']},
    { model: seatModel, attributes: ['rowNum',
    'seatNum']},
    ]
    }
    )
    return response.json({
    success: true,
    data: tickets,
    message: `All tickets have been loaded`
    })
    }
    