document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("registrationForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const formData = new FormData(this);
    
        fetch('http://localhost:3000/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // Handle the response, like showing the modal, etc.
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
        // Calculate individual costs
        const roomCost = calculateRoomCost();
        const amenitiesCost = calculateAmenitiesCost();
        const personsCost = calculateAdditionalPersonsCost();
        const totalCost = roomCost + amenitiesCost + personsCost;
        const advancePayment = 1000;  // Given fixed amount
        const balanceAmount = totalCost - advancePayment;
    
        // Display calculated costs in the cost modal
        document.getElementById("roomCostDisplay").textContent = "Room Cost: ₹" + roomCost;
        document.getElementById("amenitiesCostDisplay").textContent = "Amenities Cost: ₹" + amenitiesCost;
      //  document.getElementById("personsDisplay").textContent = "Number of Persons: " + persons;
        document.getElementById("personsCostDisplay").textContent = "Additional Person Cost: ₹" + personsCost;
        document.getElementById("totalCostDisplay").textContent = "Total Cost: ₹" + totalCost;
        document.getElementById("balanceDisplay").textContent = "Balance to be paid: ₹" + balanceAmount;
    
     

      // Display the number of persons and their associated cost in the cost modal

        // Show the cost modal
        showModal("costModal");


    // Add click event to the Confirm Booking button
    document.getElementById("confirmBooking").addEventListener("click", function() {
        // Close the cost modal and show the success modal
        closeModal("costModal");
        showModal("successModal");
    });

    // Close buttons for the modals
    document.getElementById("closeCostModal").addEventListener("click", function() {
        closeModal("costModal");
    });
    document.getElementById("closeSuccessModal").addEventListener("click", function() {
        closeModal("successModal");
    });


    

});


function calculateRoomCost() {
    const roomCosts = {
        'deluxe': 2500,
        'suite': 4000
    };
    const roomType = document.getElementById("roomType").value;
    const days = parseInt(document.getElementById("days").value);
    return roomCosts[roomType] * days;

}

function calculateAdditionalPersonsCost() {
    const persons = parseInt(document.getElementById("persons").value, 10);
    document.getElementById("personsDisplay").textContent = "Number of Persons: " + persons;

    return persons > 2 ? (persons - 2) * 1000 : 0; // ₹1000 for each person beyond the first 2
}

function calculateAmenitiesCost() {
    const amenityCosts = {
        'AC': 1000,
        'Locker': 300
    };
    let totalAmenitiesCost = 0;
    Array.from(document.querySelectorAll('input[name="amenities"]:checked')).forEach(amenity => {
        totalAmenitiesCost += amenityCosts[amenity.value];
    });
    return totalAmenitiesCost;
}



/*  enabling the print button  */

document.getElementById("printButton").addEventListener("click", function() {
    printModal("costModal");
});

function printModal(modalId) {
    const modalContent = document.getElementById(modalId).cloneNode(true);
    const iframe = document.createElement('iframe');
    
    document.body.appendChild(iframe);
    
    iframe.contentDocument.body.appendChild(modalContent);
    iframe.contentWindow.print();

    // Remove the iframe after printing
    iframe.parentNode.removeChild(iframe);
}



/* showing and closing the modal flex */

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

document.getElementById("closeModal").onclick = function() {
    modal.style.display = "none";
}


});

