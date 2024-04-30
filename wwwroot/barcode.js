// barcodeScanner.js

window.barcodeScanner = {
  startScanner: function () {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#barcode-scanner-container"),
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // or "user" for front camera
          },
        },
        decoder: {
          readers: ["ean_reader"], // specify the type of barcode to decode
        },
      },
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );

    Quagga.onDetected(function (data) {
      window.barcodeScanner.onBarcodeScanned(data);
    });
  },
  stopScanner: function () {
    Quagga.stop();
  },
  onBarcodeScanned: function (data) {
    console.log(data);
    DotNet.invokeMethodAsync(
      "blazor-barcode",
      "OnBarcodeScanned",
      data.codeResult.code
    );
    var txtBarcode = document.getElementById("txtBarcode");
    txtBarcode.value = data.codeResult.code;
  },
};

window.localStorageFunctions = {
  getItem: function (key) {
    return localStorage.getItem(key);
  },
};
