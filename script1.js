document.querySelector(".generate_qr").addEventListener("click", function() {
    var upi_id = document.querySelector(".upi_id").value;
    var amount = document.querySelector(".amount").value;
    var link = "upi://pay?pa=" + upi_id + "&am=" + amount + "&tn=Payment";
    var upi = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(link);
    console.log(upi);
    document.querySelector(".get_qr").src = upi;

    // Update link
    document.querySelector(".upi_link").href = link;
    document.querySelector(".upi_link").textContent = link;

    document.querySelector(".form").style.display = "none";
    document.querySelector(".qr_code").style.display = "block";
});

 // Download QR Code
 document.querySelector(".download_qr").addEventListener("click", function() {
    var qr = document.querySelector(".get_qr");
    if (qr.src) {
        // Create a canvas element
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            // Convert canvas to image data URL
            var dataURL = canvas.toDataURL('image/png');

            // Create an anchor element
            var link = document.createElement('a');
            link.href = dataURL;
            link.download = 'qr_code.png';

            // Trigger click on the anchor element
            link.click();
        };
        img.src = qr.src;
    } else {
        alert("QR code not generated yet.");
    }
});


// Copy link button
document.querySelector(".copy_link").addEventListener("click", function() {
    var link = document.querySelector(".upi_link").textContent;
    navigator.clipboard.writeText(link).then(function() {
        alert('Link copied to clipboard!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
});

// Reset Button (Refresh Page)
document.querySelector(".reset_btn").addEventListener("click", function() {
    location.reload(); // Reloads the page
});
