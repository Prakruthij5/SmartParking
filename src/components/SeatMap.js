import React from 'react';




function SeatMap({data}) {

  const rows = 100; // Number of rows in the seat map

  const columns = 100; // Number of columns in the seat map
console.log("data in seatmap",data)
const slotNums = data.map(item => item.slotNum);


  // const bookedSeats = [100, 15,12,17,963,1,2,5,10]; // Example data for booked seats

  // const data = {

  //   0: 10,

  //   1: 411,

  //   2: 262,

  //   3: 3,

  //   4: 44,

  //   5: 5,

  //   length: 6,

  // };

  const bookedSeats = Object.values(slotNums);

  console.log('booked seat',bookedSeats)

  const renderSeats = () => {

    const seats = [];

    let seatNumber=0;

    for (let row = 1; row <= rows; row++) {

      const rowSeats = [];




      for (let col = 1; col <= columns; col++) {

        seatNumber += 1;

        const isBooked = bookedSeats.includes(seatNumber);

        const seatClass = isBooked ? 'booked' : 'available';




        rowSeats.push(

          <td key={seatNumber} className={`seat-cell ${seatClass}`}>

            {seatNumber}

          </td>

        );

      }




      seats.push(<tr key={row}>{rowSeats}</tr>);

    }




    return seats;

  };




  return (

    <div>

     

      <table className="seat-map">

        <tbody>{renderSeats()}</tbody>

      </table>

    </div>

  );

}




export default SeatMap;